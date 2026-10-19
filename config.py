"""
Central configuration for Flask deployment and runtime environment.
Uses environment variables with safe defaults and never exposes secret keys.
"""
import os


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-local-anniversary-key-change-in-prod")
    DEBUG = os.environ.get("FLASK_DEBUG", "0") == "1"
    PORT = int(os.environ.get("PORT", 5000))
    HOST = os.environ.get("HOST", "0.0.0.0")
    TEMPLATES_AUTO_RELOAD = True
