from fastapi import FastAPI,Depends
from fastapi.middleware.cors import CORSMiddleware
from authlib.integrations.starlette_client import OAuth
from starlette.requests import Request
from starlette.config import Config
from starlette.responses import HTMLResponse,JSONResponse, RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from .api.endpoints import users
from pydantic import BaseModel


app = FastAPI()

#********** login and register **********
# Add CORS middleware to allow requests from the frontend
origins = [
    "http://localhost",
    "http://localhost:5173",  # Replace with your frontend URL
]

app.add_middleware( 
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router, prefix="/users")  # Add a prefix for better organization

# Optionally, you can define a root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI application!"}


#********** OAuth setup **********
app.add_middleware(SessionMiddleware, secret_key="!secret")
@app.get('/')
async def home(request: Request):
    user = request.session.get('user')
    if user is not None:
        email = user['email']
        html = (
            f'<pre>Email: {email}</pre><br>'
            '<a href="/docs">documentation</a><br>'
            '<a href="/logout">logout</a>'
        )
        return HTMLResponse(html)
    return HTMLResponse('<a href="/login">login</a>')
#load environment variables
config = Config(".env")

oauth = OAuth(config)

#
CONF_URL = "https://accounts.google.com/.well-known/openid-configuration"
oauth.register(
    name="google",
    server_metadata_url=CONF_URL, 
   
    client_kwargs={"scope": "openid email profile"},
)

#
@app.get("/users/google")
async def login_via_google(request:Request):
    redirect_uri = request.url_for("auth_via_google")
    return await oauth.google.authorize_redirect(request,redirect_uri)

@app.route("/auth/google")
async def auth_via_google(request:Request):
    token = await oauth.google.authorize_access_token(request) # Get the token
    if 'id_token' not in token:
        return {"error": "Authentication failed. No ID token found."}
    user = await oauth.google.parse_id_token(request,token) # Parse the user
    # Here we would typically create a session or JWT for the user
    #save the user in the database
    request.session["user"] = dict(user)
    # return {"user": user}
    return RedirectResponse(url="/")

app.include_router(users.router, prefix="/users")

@app.get('/logout') 
async def logout(request: Request):
    # Remove the user
    request.session.pop('user', None)

    return RedirectResponse(url='/home')


#************ OpenAI API ************


import openai
from dotenv import load_dotenv

# # from fastapi import FastAPI, Form
# # from fastapi import FastAPI, HTTPException, Form
# # from app.auth import register_user, login_user
# # import bcrypt
# # import mysql.connector
# # from app.db import get_db_connection
# # from pydantic import BaseModel
import os


# # @app.post("/login")
# # def login(email: str = Form(...), password: str = Form(...)):
# #     try:
# #         db = get_db_connection()
# #         cursor = db.cursor()
# #         sql = "SELECT password_hash FROM users WHERE email = %s"
# #         cursor.execute(sql, (email,))
# #         result = cursor.fetchone()
        
# #         if result and bcrypt.checkpw(password.encode('utf-8'), result[0]):
# #             return {"message": "Login successful!"}
# #         else:
# #             raise HTTPException(status_code=401, detail="Invalid credentials")
# #     except mysql.connector.Error as err:
# #         raise HTTPException(status_code=500, detail="Internal server error")

# # @app.post("/register")
# # def register(email: str = Form(...), password: str = Form(...)):
# #     register_user(email, password)
# #     return {"message": "User registered successfully!"}



# # # Get configuration settings 
load_dotenv()
azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
azure_oai_key = os.getenv("AZURE_OAI_KEY")
azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT")
azure_search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
azure_search_key = os.getenv("AZURE_SEARCH_KEY")
azure_search_index = os.getenv("AZURE_SEARCH_INDEX")
        
# Initialize the OpenAI API client
openai.api_key = "your-openai-api-key"

class QueryRequest(BaseModel):
    query: str

async def rag_query_and_openai(query: str):
    #here will be the code of ai (not this one-this is just an example)
    response = openai.ChatCompletion.create(
        model="gpt-35-turbo",  # Example model, replace with actual one
        messages=[{"role": "system", "content": "You are a helpful assistant."},
                  {"role": "user", "content": query}]
    )
    return response.choices[0].message["content"]

# FastAPI route to handle user queries
@app.post("/api/get-answer")
async def get_answer(request: QueryRequest):
    try:
        user_query = request.query
        answer = await rag_query_and_openai(user_query)
        return {"answer": answer}
    except Exception as e:
        return {"error": str(e)}
