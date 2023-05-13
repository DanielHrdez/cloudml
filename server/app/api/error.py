"""Error Detection API."""

import joblib
import pandas as pd
import numpy as np
from fastapi import APIRouter
from pydantic import BaseModel  # pylint: disable=no-name-in-module

router = APIRouter(prefix="/error")
# model = joblib.load("models/cost/linear.joblib")


class ErrorCSVFile(BaseModel):
    todo: str


@router.post("/train/split={train_split}")
def train_model(file: ErrorCSVFile, train_split: float):
    # todo: train model
    # todo: select best model
    # todo: return model and metrics and plots
    return {"todo": "todo"}


@router.post("/predict")
def test_model(file: ErrorCSVFile, model: str):
    # todo: load model from deserialized model __dict__
    # todo: predict on test data
    # todo: return metrics and plots
    return {"todo": "todo"}
