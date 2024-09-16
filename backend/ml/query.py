from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from azure.ai.inference import EmbeddingsClient
from azure.core.credentials import AzureKeyCredential
import time
import os
from dotenv import load_dotenv

load_dotenv()
endpoint = os.getenv("my_endpoint")
embed_model = os.getenv("my_embed_model")
token = os.getenv("my_token")
PINECONE_API_KEY = os.getenv("my_PINECONE_API_KEY")
index_name = os.getenv("my_index_name")

def init_embedding_client():
    embedding_client = EmbeddingsClient(
    endpoint=endpoint,
    credential=AzureKeyCredential(token)
    )
    return embedding_client

def init_pinecone():
    pc = Pinecone(api_key=PINECONE_API_KEY)
    return pc


def rag(query: str):
    print(query)
    embedding_client = init_embedding_client()
    response = embedding_client.embed(input=[query],model=embed_model, dimensions=768)
    embedding = response['data'][0]['embedding']
    print("########## Query Embeddings ##########")
    print(embedding)
    pc = init_pinecone()
    # connect to index
    index = pc.Index(index_name)
    result = index.query(
        namespace="",
        vector=embedding, # real embeddings of the query
        top_k=3, # get only the top_k matches
        include_values=True,
        include_metadata=True
    )

    print("######### RESULT ###########")
    print(result)

    # get list of retrieved text

    # adjust the format to get the text
    contexts = [item['metadata']['text'] for item in result['matches']]
    print("######### CONTEXTS ###########")
    print(contexts)

    augmented_query = "\n\n---\n\n".join(contexts)+"\n\n-----\n\n"+query

    print("######### Augmented_Query ###########")
    print(augmented_query)

    # system message to 'prime' the model
    primer = f"""You are a financial advisor with expertise in investment strategies. 
    I will give you some context to seach in it. 
    Leverage this context to provide the most accurate and insightful response to the query. 
    If the answer is not found within the context, say 'I did not find the answer in your provided context' and provide a general response based on internal knowledge to deliver a well-informed response.
    """

    
    openai_client = OpenAI(
        base_url="https://models.inference.ai.azure.com",
        api_key=token,
    )
    response = openai_client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": primer,
            },
            {
                "role": "user",
                "content": augmented_query,
            }
        ],
        model="gpt-4o",
        temperature=1,
        max_tokens=4096,
        top_p=1
    )
    print("################ Model Answer###############")
    return response.choices[0].message.content