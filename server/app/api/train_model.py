from typing import cast, Tuple, Union

import numpy as np
import pandas as pd
from sklearn.model_selection import cross_validate
from imblearn.over_sampling import SMOTE
from imblearn.pipeline import Pipeline
from sklearn.metrics import roc_curve, auc

from app.api.model_globals import (
    MODELS,
    SCORING,
    RANDOM_STATE,
)
import matplotlib.pyplot as plt
import base64
from io import BytesIO


def split_by(col: str, words: int, split_by: str) -> str:
    if split_by is None:
        return col
    splitted = col.split(split_by)
    return split_by.join(splitted[:words])


def search_split_symbol(string: str, split_symbols: list[str]) -> Union[str, None]:
    for char in string:
        if char in split_symbols:
            return char
    return None


def map_by_start(col: str, words: int) -> str:
    split_symbols = ["_", " ", "-", "."]
    split_symbol = search_split_symbol(col, split_symbols)
    return split_by(col, words, split_symbol)


def map_cols(data: pd.DataFrame, corr_rate: float) -> pd.DataFrame:
    mapped_cols = map(lambda x: map_by_start(x, 5), data.columns[:-1])
    list_mapped_cols = list(mapped_cols)
    df_result = data.copy()
    df_result.columns = list_mapped_cols + data.columns[-1:].tolist()
    df_result = df_result.transpose().groupby(level=0).sum().transpose()
    corr_cols = df_result.corr()[abs(df_result.corr()["run_state"]) > corr_rate][
        "run_state"
    ]
    df_result = df_result[corr_cols.index]
    return df_result


def split_df(data: pd.DataFrame, train_pct: float):
    train, test = cast(
        Tuple[pd.DataFrame, pd.DataFrame],
        np.split(data, [int(train_pct * len(data))]),
    )
    x_train, y_train = get_xy(train, "run_state")
    x_test, y_test = get_xy(test, "run_state")
    return x_train, y_train, x_test, y_test


def get_xy(data: pd.DataFrame, col: str):
    X = data.drop([col], axis=1)
    y: pd.Series = data[col]
    return X, y


def cross_val_all_models(models, x_data, y_data, n_cv=10, scoring=None):
    scores = {}
    for model in models:
        pipeline_model = Pipeline(
            [("oversampling", SMOTE(random_state=RANDOM_STATE)), ("model", model)]
        )
        score = cross_validate(
            pipeline_model, x_data, y_data, cv=n_cv, scoring=scoring, n_jobs=-1
        )
        score_aux = {key: sum(score[f"test_{key}"]) / n_cv for key in scoring}
        score_aux["f1"] = (score_aux["f1_class_0"] + score_aux["f1_class_1"]) / 2
        scores[model.__class__.__name__] = score_aux
    return pd.DataFrame(scores).transpose()


def score_models(data, models, scoring, n_cv=10, corr_rate=0.15):
    df_mapped = map_cols(data, corr_rate)
    x_data, y_data = get_xy(df_mapped, "run_state")
    result = cross_val_all_models(models, x_data, y_data, n_cv, scoring)
    return result


def select_best_model(data, models, scoring, n_cv=10, corr_rate=0.15):
    result = score_models(data, models, scoring, n_cv, corr_rate)
    model_name = result.sort_values(by=["f1"], ascending=False).index[0]
    return list(filter(lambda x: x.__class__.__name__ == model_name, models))[0]


def train_model(data: pd.DataFrame, train_pct: float):
    # model = select_best_model(data, MODELS, SCORING)
    model = MODELS[0]
    x_train, y_train, x_test, y_test = split_df(data, train_pct)
    pipeline_model = Pipeline(
        [("oversampling", SMOTE(random_state=RANDOM_STATE)), ("model", model)]
    )
    pipeline_model.fit(x_train, y_train)
    accuracy = pipeline_model.score(x_test, y_test).item()
    roc_html = get_roc_curve_html(pipeline_model, x_test, y_test)
    return (
        pipeline_model.steps[1][1],
        accuracy,
        roc_html
    )


def get_roc(model, x_test, y_test):
    y_score = model.predict_proba(x_test)
    fpr, tpr, _ = roc_curve(y_test, y_score[:, 1])
    return auc(fpr, tpr), fpr, tpr


def get_roc_curve_html(model, x_test, y_test):
    roc_auc, fpr, tpr = get_roc(model, x_test, y_test)
    fig = plt.figure()
    plt.plot(
        fpr, tpr, color="darkorange", lw=2, label="ROC curve (area = %0.2f)" % roc_auc
    )
    plt.plot([0, 1], [0, 1], lw=2, linestyle="--", color="r", label="Random guess")
    plt.xlim([0.0, 1.0])
    plt.ylim([0.0, 1.05])
    plt.xlabel("False positive rate")
    plt.ylabel("True positive rate")
    plt.title("ROC curve")
    plt.legend(loc="lower right")
    tmpfile = BytesIO()
    fig.savefig(tmpfile, format="png")
    encoded = base64.b64encode(tmpfile.getvalue()).decode("utf-8")
    html = f"data:image/png;base64,{encoded}"
    return html
