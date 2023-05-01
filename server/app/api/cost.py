"""Cost Prediction API."""
import joblib
from fastapi import APIRouter

router = APIRouter(prefix="/cost")
model = joblib.load("models/cost/linear.joblib")


@router.get("/time={time}&capacity={capacity}")
def predict_cost(time: int, capacity: int):
    """Predict cost given time and capacity."""
    time_cap = time * capacity
    try:
        cap_per_time = capacity / time
    except ZeroDivisionError:
        cap_per_time = 0
    features = [
        time,
        capacity,
        time_cap,
        cap_per_time,
        time**0.5,
        time_cap**0.5,
    ]
    return {"cost": model.predict([features])[0]}
