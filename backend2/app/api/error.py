"""Error Detection API."""

from fastapi import APIRouter
from app.api.file import ErrorCSVFileTrain, ErrorCSVModel
from app.api.train_model import train_models, map_cols
import pickle
from io import BytesIO
import matplotlib.pyplot as plt

router = APIRouter(prefix="/error")


@router.post("/train")
def post_train_model(file: ErrorCSVFileTrain, split: float):
    data = file.get_df()
    corr_rate, words = 0.05, 6
    data, model, accuracy, roc = train_models(data, split, corr_rate, words)
    cols = data.columns.values.tolist()
    cols.remove("run_state")
    model_bytes = pickle.dumps({"model": model, "cols": tuple(cols), "words": words})
    return {"model": str(model_bytes), "accuracy": accuracy, "roc": roc}


@router.post("/predict")
def post_test_model(file_model: ErrorCSVModel):
    file = file_model.get_df()
    model_bytes = eval(file_model.model)
    model_dict = pickle.loads(model_bytes)
    model = model_dict["model"]
    cols = list(model_dict["cols"])
    words = model_dict["words"]
    X = get_x_from_file(file, cols, words)
    y_pred = model.predict(X)
    n_errors = sum(y_pred)
    pct_errors = n_errors / len(y_pred)
    histogram = get_histogram(X, y_pred)
    svg = get_histogram_svg(histogram)

    return {
        "nErrors": n_errors,
        "pctErrors": round(pct_errors * 100, 2),
        "histogram": svg,
    }


def get_histogram_svg(histogram):
    fig = plt.figure()
    plt.bar(list(histogram.keys()), list(histogram.values()))
    plt.xticks(rotation=90)
    plt.xlabel("Columns")
    plt.ylabel("Errors")
    plt.title("Errors by column")
    plt.tight_layout()
    buf = BytesIO()
    fig.savefig(buf, format="svg")
    buf.seek(0)
    svg = buf.read()
    return svg


def get_histogram(data, y_pred):
    histogram = {}
    for col in data.columns:
        if data[col].shape == (353, 2):
            print(data[col])
        histogram[col] = sum(data[col] * y_pred)
    histogram = dict(reversed(sorted(histogram.items(), key=lambda item: item[1])))
    # the cols can be renamed to 'Col1', 'Col2', etc.
    # histogram = {f"Col{i}": histogram[col] for i, col in enumerate(histogram)}
    return histogram


def get_x_from_file(file, cols, words):
    file = map_cols(file, None, words)
    cols_file = file.columns.values.tolist()
    for col in cols:
        if col not in cols_file:
            file[col] = 0
    file = file[cols]
    file.columns = cols
    X = file
    return X
