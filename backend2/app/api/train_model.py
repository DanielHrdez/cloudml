from typing import Union

import pandas as pd
from sklearn.model_selection import cross_validate
from imblearn.over_sampling import SMOTE
from sklearn.metrics import roc_curve, auc, balanced_accuracy_score
from sklearn.model_selection import train_test_split

from app.api.model_globals import (
    MODELS,
    SCORING,
    RANDOM_STATE,
)
import matplotlib.pyplot as plt
from io import BytesIO

from multiprocessing import Process, Queue


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
    if split_symbol is None:
        return col
    return split_by(col, words, split_symbol)


def map_cols(data: pd.DataFrame, corr_rate: Union[float, None], words: int):
    mapped_cols = map(lambda x: map_by_start(x, words), data.columns[:-1])
    list_mapped_cols = list(mapped_cols)
    data.columns = list_mapped_cols + data.columns[-1:].tolist()
    data = data.transpose().groupby(level=0).sum().transpose()
    if corr_rate is None:
        return data
    corr = data.corr()
    corr_cols = corr[abs(corr["run_state"]) > corr_rate]["run_state"]
    data = data[corr_cols.index]
    return data


def get_xy(data: pd.DataFrame, col: str):
    X = data.drop([col], axis=1)
    y: pd.Series = data[col]
    return X, y


def cross_val_all_models(models, x_data, y_data, n_cv=10, scoring=None):
    scores = {}
    for model in models:
        score = cross_validate(
            model, x_data, y_data, cv=n_cv, scoring=scoring, n_jobs=-1
        )
        if scoring is None:
            scoring = SCORING
        score_aux = {key: sum(score[f"test_{key}"]) / n_cv for key in scoring}
        score_aux["f1"] = (score_aux["f1_class_0"] + score_aux["f1_class_1"]) / 2
        scores[model.__class__.__name__] = score_aux
    return pd.DataFrame(scores).transpose()


def select_best_model(x_data, y_data, models, scoring, n_cv=10):
    result = cross_val_all_models(models, x_data, y_data, n_cv, scoring)
    model_name = result.sort_values(by=["f1"], ascending=False).index[0]
    return list(filter(lambda x: x.__class__.__name__ == model_name, models))[0]


def train_models(data: pd.DataFrame, train_pct: float, corr_rate=0.05, words=6):
    data, x_train, y_train, x_test, y_test = split_xy_train_test(
        data, train_pct, corr_rate, words
    )
    x_train, y_train = SMOTE(random_state=RANDOM_STATE).fit_resample(x_train, y_train)  # type: ignore
    model = select_best_model(x_train, y_train, MODELS, scoring=SCORING, n_cv=10)
    model.fit(x_train, y_train)
    accuracy = balanced_accuracy_score(y_test, model.predict(x_test))
    if accuracy < 0.5:
        accuracy = 1 - accuracy
    roc_svg = get_roc_curve_svg(model, x_test, y_test)
    return data, model, accuracy, roc_svg


def split_xy_train_test(data, train_pct, corr_rate, words=5):
    data = map_cols(data, corr_rate, words)
    train, test = train_test_split(
        data,
        train_size=train_pct,
        random_state=RANDOM_STATE,
        stratify=data["run_state"],
    )
    x_train, y_train = get_xy(train, "run_state")
    x_test, y_test = get_xy(test, "run_state")
    return data, x_train, y_train, x_test, y_test


def get_roc(model, x_test, y_test):
    y_score = model.predict_proba(x_test)
    fpr, tpr, _ = roc_curve(y_test, y_score[:, 1])
    roc_auc = auc(fpr, tpr)
    if roc_auc < 0.5:
        fpr, tpr = tpr, fpr
        roc_auc = 1 - roc_auc
    return roc_auc, fpr, tpr


def get_roc_curve_svg(model, x_test, y_test):
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
    buf = BytesIO()
    fig.savefig(buf, format="svg")
    buf.seek(0)
    svg = buf.read()
    return svg
