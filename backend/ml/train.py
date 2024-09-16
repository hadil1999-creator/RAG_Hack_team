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


def setup_Pinecone():
    # initialize Pinecone Database
    pc = init_pinecone()
    # Check if the desired index is in the list of existing indexes
    if index_name not in pc.list_indexes().names():
        print("creating index....")
        pc.create_index(
            name=index_name,
            dimension=768, # need to match the dimension of the embedding model = 768
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        while not pc.describe_index(index_name).status["ready"]:
            time.sleep(1)
        print("index created successfuly!!")
    else:
        print("index_name already exists!!")
    
    # connect to index
    index = pc.Index(index_name)

    # view index stats
    stats = index.describe_index_stats()
    print(stats)
    return index


def load_doc(path):
    # create a loader
    loader = PyPDFLoader(path)

    # load data
    data = loader.load()

    # Step 1: Split the Document
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    texts = text_splitter.split_documents(data)
    return texts

texts = load_doc(r"path_to_pdf_file")
print (texts)

# Step 2: Generate Embeddings
def get_embeddings(texts):
    embedding_client = init_embedding_client()
    embeddings = []
    for i, text_chunk in enumerate(texts):
        print(text_chunk.page_content)
        print("########### EMBEDDING ##############")
        response = embedding_client.embed(input=text_chunk.page_content,model=embed_model, dimensions=768)
        # response = openai.Embedding.create(input=text_chunk.page_content, model=embed_model, dimensions=768)
        # max limit is 15 requests / 60 seconds
        time.sleep(4)
        embedding = response['data'][0]['embedding']
        print(embedding)
        # create a dictionary with id and values
        embedding_dict = {
            "id": str(i),
            "values": embedding,
            "metadata": {"text": text_chunk.page_content}
        }
        # Append the dictionary to the list
        embeddings.append(embedding_dict)

    return embeddings



formatted_embeddings = get_embeddings(texts)
print(formatted_embeddings)


# Step 3: Upsert the Formatted Embeddings into PineCone with 559 vectors / upsert request. See the limits for each dimension here: https://docs.pinecone.io/guides/data/upsert-data#upsert-limits
def upsert():

    batch_size = 559
    pc = init_pinecone()
    index = pc.Index(index_name)
    # Process embeddings in chunks
    for i in range(0, len(formatted_embeddings), batch_size):
        batch = formatted_embeddings[i:i + batch_size]
        print(batch)
        index.upsert(batch)
        print(f"Upserted batch {i // batch_size + 1}")
        time.sleep(4)

    print(index.describe_index_stats())
    return
print("######UPSERTING######")
upsert()