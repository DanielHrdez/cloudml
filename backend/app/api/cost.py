"""Cost Prediction API."""

import joblib
import pandas as pd
import numpy as np
from fastapi import APIRouter

from app.api.file import CostCSVFile

router = APIRouter(prefix="/cost")
model = joblib.load("models/linear.joblib")


def transform_data(df_time_cap: pd.DataFrame):
    """
    The function takes a DataFrame with columns "time" and "capacity", performs various
    transformations on the data, and returns the modified DataFrame.

    :param df_time_cap: The input parameter is a pandas DataFrame named "df_time_cap"
    :type df_time_cap: pd.DataFrame
    :return: The function `transform_data` returns the input DataFrame `df_time_cap` with additional
    columns added to it, including `time_cap`, `cap_per_time`, `time_sqrt`, and `time_cap_sqrt`.
    """
    df_time_cap["time_cap"] = df_time_cap["time"] * df_time_cap["capacity"]
    df_time_cap["cap_per_time"] = df_time_cap["capacity"] / df_time_cap["time"]
    df_time_cap["cap_per_time"] = df_time_cap["cap_per_time"].replace(
        [np.inf, -np.inf], 0
    )
    df_time_cap["time_sqrt"] = df_time_cap["time"] ** 0.5
    df_time_cap["time_cap_sqrt"] = df_time_cap["time_cap"] ** 0.5
    return df_time_cap


@router.get("")
def get_predict_cost(time: int, capacity: int):
    """
    This function takes in time and capacity as inputs, transforms the data, and returns a predicted
    cost using a machine learning model.

    :param time: The time parameter is an integer that represents the time (in hours, minutes, or
    seconds) for which the cost prediction is being made. It is used as an input feature for the
    machine learning model to predict the cost
    :type time: int
    :param capacity: Capacity refers to the maximum number of people or items that can be
    accommodated or transported by a certain service or facility. In the context of this code, it
    is likely referring to the capacity of a transportation service, such as a bus or train
    :type capacity: int
    :return: a dictionary with a single key-value pair where the key is "cost" and the value is the
    predicted cost based on the input parameters "time" and "capacity".
    """
    df_time_cap = pd.DataFrame({"time": [time], "capacity": [capacity]})
    features = transform_data(df_time_cap)
    return {"cost": model.predict(features.values.reshape(1, -1))[0]}


@router.post("/file")
def post_predict_cost_by_file(file: CostCSVFile):
    """
    This function takes in a CSV file of cost data, transforms it, predicts the cost using a
    pre-trained model, and returns the total cost.

    :param file: The "file" parameter is of type "CostCSVFile", which is likely a Pydantic model
    representing a CSV file containing data related to costs. The function reads the data from
    the file, transforms it, and uses a pre-trained model to predict the cost based on
    the input data.
    :type file: CostCSVFile
    :return: a dictionary with a single key-value pair where the key is "cost" and the value is
    the sum of the predictions made by the model on the input data.
    """
    df_time_cap = file.get_df()
    df_time_cap = transform_data(df_time_cap)
    result = model.predict(df_time_cap.values)
    return result.tolist()
