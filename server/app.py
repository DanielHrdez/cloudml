import joblib
import json
from flask import Flask, request

app = Flask(__name__)
model = joblib.load("models/cost/linear.joblib")


@app.route("/cost")
def predict_cost():
    time = float(request.args.get("time"))
    capacity = float(request.args.get("capacity"))
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
    # return f"{round(model.predict([features])[0], 2)}€"
    return json.dumps({"cost": model.predict([features])[0]})


@app.route("/")
def hello():
    return "Hello World!"
