"""Initialize API Router Tests."""
import unittest
from fastapi import APIRouter
from app.api import cost


class TestAPIRouter(unittest.TestCase):
    """
    The TestAPIRouter class is a unit test case for testing an API router in Python.
    """

    def setUp(self):
        """
        This function sets up an API router with a prefix and includes another router.
        """
        self.router = APIRouter(prefix="/api", tags=["api"])
        self.router.include_router(cost.router)

    def test_prefix(self):
        """
        This function tests whether the router's prefix is equal to "/api".
        """
        self.assertEqual(self.router.prefix, "/api")

    def test_tags(self):
        """
        This function tests if the router's tags attribute is equal to ["api"].
        """
        self.assertEqual(self.router.tags, ["api"])

    def test_routing(self):
        """
        The function tests the number of routes in a router object and asserts
        that it is equal to 2.
        """
        routes = self.router.routes
        self.assertEqual(len(routes), 2)


if __name__ == "__main__":
    unittest.main()
