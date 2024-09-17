from fastapi.middleware.cors import CORSMiddleware # adding this to allow CORS requests from the frontend
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import openai
from dotenv import load_dotenv
from auth import *
from fastapi import FastAPI, Form
from fastapi import FastAPI, HTTPException, Form
from app.auth import register_user, login_user
import bcrypt
import mysql.connector
from app.db import get_db_connection
import os
app = FastAPI()


# If your frontend is served from another domain, allow CORS
origins = ["http://localhost:5173"]  # Change this to your frontend's address

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Or specify methods like ["GET", "POST"]
    allow_headers=["*"],  # Or specify headers like ["Content-Type", "Authorization"]
)

@app.post("/login")
def login(email: str = Form(...), password: str = Form(...)):
    try:
        db = get_db_connection()
        cursor = db.cursor()
        sql = "SELECT password_hash FROM users WHERE email = %s"
        cursor.execute(sql, (email,))
        result = cursor.fetchone()
        
        if result and bcrypt.checkpw(password.encode('utf-8'), result[0]):
            return {"message": "Login successful!"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except mysql.connector.Error as err:
        raise HTTPException(status_code=500, detail="Internal server error")

@app.post("/register")
def register(email: str = Form(...), password: str = Form(...)):
    register_user(email, password)
    return {"message": "User registered successfully!"}

        



class QueryRequest(BaseModel):
    query: str

from ml.train import rag_query_and_openai
async def rag_query_and_openai(query: str):
    
    return rag_query_and_openai(str)

# FastAPI route to handle user queries
@app.post("/api/get-answer")
async def get_answer(request: QueryRequest):
    try:
        user_query = request.query
        answer = "Simulated response"
        #answer = await rag_query_and_openai(user_query)
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}
