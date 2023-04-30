"""App factory for the flaskr application."""
import joblib
from flask import Flask
from flask_cors import CORS


def create_app():
    """Create and configure an instance of the Flask application."""
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    model = joblib.load("models/cost/linear.joblib")

    @app.route("/api/cost/time=<int:time>&capacity=<int:capacity>")
    def predict_cost(time: int, capacity: int):
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
        return str(model.predict([features])[0])

    return app
