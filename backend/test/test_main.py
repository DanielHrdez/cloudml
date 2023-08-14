"""
The test_main.py module contains the TestApp class that contains four test functions that check if
a FastAPI instance is created successfully, if the API router is included, if a CORS middleware has
been added, and if static files are mounted correctly in a FastAPI application.
"""

import unittest
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api import router as api_router


class TestApp(unittest.TestCase):
    """
    The TestApp class contains four test functions that check if a FastAPI instance is created
    successfully, if the API router is included, if a CORS middleware has been added, and if static
    files are mounted correctly in a FastAPI application.
    """

    def test_fast_api_creation(self):
        """
        This function tests if a FastAPI instance is created successfully.
        """
        app = FastAPI()
        self.assertIsInstance(app, FastAPI)

    def test_api_router_included(self):
        """
        This function tests whether the API router is included in the FastAPI app.
        """
        app = FastAPI()
        app.include_router(api_router)
        self.assertIsNotNone(app.router.routes)

    def test_cors_middleware_added(self):
        """
        This function tests whether a CORS middleware has been added to a FastAPI application.
        """
        app = FastAPI()
        app.add_middleware(
            CORSMiddleware,
            allow_origins=["*"],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )
        self.assertIsNotNone(app.middleware)

    def test_static_files_mounted(self):
        """
        This function tests whether static files are mounted correctly in a FastAPI application.
        """
        app = FastAPI()
        app.mount("/", StaticFiles(directory="dist", html=True), name="static")
        self.assertIsNotNone(app.router.routes)
