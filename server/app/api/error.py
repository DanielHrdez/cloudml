"""Error Detection API."""

from fastapi import APIRouter
from app.api.file import ErrorCSVFile
from app.api.train_model import train_model
import pickle

router = APIRouter(prefix="/error")


@router.post("/train")
def post_train_model(file: ErrorCSVFile, split: float):
    data = file.get_df()
    model, accuracy, roc = train_model(data, split)
    model_bytes = pickle.dumps(model)
    return {"model": str(model_bytes), "accuracy": accuracy, "roc": roc}


@router.post("/predict")
def post_test_model(file: ErrorCSVFile, model: str):
    # todo: load model from deserialized model __dict__
    # todo: predict on test data
    # todo: return metrics and plots
    return {"todo": "todo"}
