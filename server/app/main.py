"""Main module for the FastAPI server."""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os
import arel

from .api import router as api_router

app = FastAPI()
app.include_router(api_router)
# app.include_router(error.router)

templates = Jinja2Templates("dist")

if _debug := os.getenv("DEBUG"):
    hot_reload = arel.HotReload(paths=[arel.Path("dist")])
    app.add_websocket_route("/hot-reload", route=hot_reload, name="hot-reload")
    app.add_event_handler("startup", hot_reload.startup)
    app.add_event_handler("shutdown", hot_reload.shutdown)
    templates.env.globals["DEBUG"] = _debug
    templates.env.globals["hot_reload"] = hot_reload

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/", StaticFiles(directory="dist", html=True), name="static")
# if _debug:
#     @app.get("/")
#     async def index(request: Request):
#         return templates.TemplateResponse("index.html", {"request": request})
# else:
#     app.mount("/", StaticFiles(directory="dist", html=True), name="static")
