from authlib.integrations.base_client import OAuthError # this is to catch the error
from authlib.oauth2.rfc6749 import OAuth2Token
from fastapi import APIRouter, Depends, HTTPException, status
from datetime import timedelta
from starlette import status
from typing import Annotated
from fastapi.security import OAuth2PasswordRequestForm
from .models import User

