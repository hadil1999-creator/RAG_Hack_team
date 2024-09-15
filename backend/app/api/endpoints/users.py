from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin
from app.crud.user import create_user,get_user
from app.db.session import get_db
from app.core.security import verify_password

router = APIRouter() # Create a router object to define the route

@router.post("/signup") 
def signup(user:UserCreate,db:Session = Depends(get_db)):
    if get_user(db,user.email):
        raise HTTPException(status_code=400,detail="User already exists")
    return create_user(db,user.email,user.password)

@router.post("/signin")
def login(user:UserLogin,db:Session = Depends(get_db)):
    db_user = get_user(db,user.email)
    if not db_user or not verify_password(user.password,db_user.password):
        raise HTTPException(status_code=400,detail="Invalid Credentials")
    return {"message":"Login Successful"}