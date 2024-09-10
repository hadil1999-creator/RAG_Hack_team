import os
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import AzureOpenAI

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Initialize Azure OpenAI client
azure_oai_endpoint = os.getenv("AZURE_OAI_ENDPOINT")
azure_oai_key = os.getenv("AZURE_OAI_KEY")
azure_oai_deployment = os.getenv("AZURE_OAI_DEPLOYMENT")

client = AzureOpenAI(
    base_url=f"{azure_oai_endpoint}/openai/deployments/{azure_oai_deployment}/extensions",
    api_key=azure_oai_key,
    api_version="2023-09-01-preview"
)

# Define input model for the request body
class UserInput(BaseModel):
    question: str

# Define a root endpoint
@app.get("/")
def root():
    return {"message": "Welcome to the Azure OpenAI integration with FastAPI"}

# Define an endpoint to interact with Azure OpenAI
@app.post("/ask")
async def ask_openai(user_input: UserInput):
    try:
        # Get the user question from the request body
        question = user_input.question

        # Configure the data source (Optional: if you are using Azure Cognitive Search with RAG)
        extension_config = dict(dataSources = [
            {
                "type": "AzureCognitiveSearch",
                "parameters": {
                    "endpoint": os.getenv("AZURE_SEARCH_ENDPOINT"),
                    "key": os.getenv("AZURE_SEARCH_KEY"),
                    "indexName": os.getenv("AZURE_SEARCH_INDEX"),
                }
            }
        ])

        # Send request to Azure OpenAI model
        response = client.chat.completions.create(
            model=azure_oai_deployment,
            temperature=0.5,
            max_tokens=1000,
            messages=[
                {"role": "system", "content": "You are a helper in finanace and an an advisor in investment"},
                {"role": "user", "content": question}
            ],
            extra_body=extension_config  # Optional if you use data sources
        )

        # Return the response from Azure OpenAI model
        return {"response": response.choices[0].message.content}

    except Exception as ex:
        raise HTTPException(status_code=500, detail=str(ex))
