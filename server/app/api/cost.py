"""Cost Prediction API."""
import joblib
import pandas as pd
import numpy as np
from fastapi import APIRouter
from pydantic import BaseModel # pylint: disable=no-name-in-module

router = APIRouter(prefix="/cost")
model = joblib.load("models/cost/linear.joblib")


class CostCSVFile(BaseModel):
    """Cost CSV File."""

    time: list[int]
    capacity: list[int]


def transform_data(df_time_cap: pd.DataFrame):
    """Transform data."""
    df_time_cap["time_cap"] = df_time_cap["time"] * df_time_cap["capacity"]
    df_time_cap["cap_per_time"] = df_time_cap["capacity"] / df_time_cap["time"]
    df_time_cap["cap_per_time"] = df_time_cap["cap_per_time"].replace(
        [np.inf, -np.inf], 0
    )
    df_time_cap["time_sqrt"] = df_time_cap["time"] ** 0.5
    df_time_cap["time_cap_sqrt"] = df_time_cap["time_cap"] ** 0.5
    return df_time_cap


@router.get("/time={time}&capacity={capacity}")
def predict_cost(time: int, capacity: int):
    """Predict cost given time and capacity."""
    df_time_cap = pd.DataFrame({"time": [time], "capacity": [capacity]})
    features = transform_data(df_time_cap)
    return {"cost": model.predict(features.values.reshape(1, -1))[0]}


@router.post("/")
def predict_cost_by_file(file: CostCSVFile):
    """Predict cost given time and capacity."""
    df_time_cap = pd.DataFrame(file.dict())
    df_time_cap = transform_data(df_time_cap)
    result = model.predict(df_time_cap.values)
    return {"cost": sum(result)}
