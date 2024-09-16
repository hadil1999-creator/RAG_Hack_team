from openai import OpenAI
from pinecone import Pinecone, ServerlessSpec
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from azure.ai.inference import EmbeddingsClient
from azure.core.credentials import AzureKeyCredential
import time

endpoint = "https://models.inference.ai.azure.com"
embed_model="text-embedding-3-small"
token = "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"
PINECONE_API_KEY="e2cdc72a-777e-46c0-930f-52ec060345ac"
index_name = "rag"

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

# texts = load_doc(r"C:\Users\sama_\Desktop\osama\Economics-of-Investing-in-America-5-15.pdf")
# print (texts)

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



# formatted_embeddings = get_embeddings(texts)
#print(formatted_embeddings)


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
# print("######UPSERTING######")
# upsert()


# query = "what is The central goal of President Biden’s plan?"

# # Step 4: Query
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
    primer = f"""You are Q&A bot. A highly intelligent system that answers
    user questions based on the information provided by the user above
    each question. If the information can not be found in the information
    provided by the user you truthfully say "I don't know".
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


# print(rag(query))

# # Non-Augmented query
# response = client.chat.completions.create(
#     messages=[
#         {
#             "role": "system",
#             "content": primer,
#         },
#         {
#             "role": "user",
#             "content": query,
#         }
#     ],
#     model="gpt-4o",
#     temperature=1,
#     max_tokens=4096,
#     top_p=1
# )
# print(response.choices[0].message.content)

# # droppping the "I don't know" part of the primer
# response = client.chat.completions.create(
#     messages=[
#         {
#             "role": "system",
#             "content": "You are Q&A bot. A highly intelligent system that answers user questions",
#         },
#         {
#             "role": "user",
#             "content": query,
#         }
#     ],
#     model="gpt-4o",
#     temperature=1,
#     max_tokens=4096,
#     top_p=1
# )
# print(response.choices[0].message.content)









####################################################################################################################
# Set up API key and endpoint
# openai.api_key = OPENAI_API_KEY

# openai.api_base = "https://models.inference.ai.azure.com"  # Azure endpoint

# # Define model name and parameters
# model_name = "gpt-4o"
