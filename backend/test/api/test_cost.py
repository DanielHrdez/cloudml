"""
The test_cost.py module contains the TestCostPredictionAPI class
that contains two test functions
"""

import unittest
from unittest.mock import MagicMock

from fastapi.testclient import TestClient
import joblib
import pandas as pd
import numpy as np

from app import app


class TestCostPredictionAPI(unittest.TestCase):
    """
    The TestCostPredictionAPI class contains unit tests for a Python application's
    `/predict_cost` and `/predict_cost_by_file` endpoints.
    """

    def setUp(self):
        """
        The function sets up a test environment for a Python application,
        including creating test data and mocking a machine learning model.
        """
        self.client = TestClient(app)
        self.test_csv_data = {"time": [1, 2, 3], "capacity": [10, 20, 30]}
        self.test_csv = pd.DataFrame(self.test_csv_data)
        self.mock_model = MagicMock()
        self.mock_prediction = np.array(
            [-0.7238165311668335, -0.7461199429710876, -0.7660540101617468]
        )
        self.mock_model.predict.return_value = self.mock_prediction
        joblib.load = MagicMock(return_value=self.mock_model)

    def test_predict_cost(self):
        """
        This is a unit test function that tests the `/predict_cost` endpoint and checks if the
        response status code is 200 and the returned data is equal to the expected mock prediction.
        """
        response = self.client.get("/api/cost/time=1&capacity=10")
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, {"cost": self.mock_prediction[0]})

    def test_predict_cost_by_file(self):
        """
        This is a unit test function that tests the `/predict_cost_by_file` endpoint by sending
        a POST request with JSON data and asserting that the response status code is 200 and
        the returned data is equal to the sum of a mock prediction.
        """
        response = self.client.post("/api/cost/file", json=self.test_csv_data)
        data = response.json()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(data, {"cost": sum(self.mock_prediction)})


if __name__ == "__main__":
    unittest.main()
