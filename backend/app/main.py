from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware # adding this to allow CORS requests from the frontend


app = FastAPI()

#configure cors

app.add_middleware(CORSMiddleware,
                   allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/hello")
async def read_root():
    return {"message": "hello World"}