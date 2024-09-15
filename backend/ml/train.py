import openai
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from langchain_openai import OpenAIEmbeddings
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA 
import time

OPENAI_API_KEY="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"

PINECONE_API_KEY="e2cdc72a-777e-46c0-930f-52ec060345ac"

openai.api_key = OPENAI_API_KEY

pc = Pinecone(api_key=PINECONE_API_KEY)



index_name = "test"
#pc.delete_index(index_name)

# Check if the desired index is in the list of existing indexes

if index_name not in pc.list_indexes().names():
    pc.create_index(
        name=index_name,
        dimension=8, # need to match the dimension of the embedding model = 768
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )
    while not pc.describe_index(index_name).status["ready"]:
        time.sleep(1)
else:
    print("index_name exists!!")


# connect to index
index = pc.Index(index_name)

# view index stats
stats = index.describe_index_stats()

print(stats)



# create a loader
loader = PyPDFLoader(r"C:\Users\osama\OneDrive\Desktop\RAG_Hack\Economics-of-Investing-in-America.pdf")


# load data
data = loader.load()

# Step 1: Split the Document
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
texts = text_splitter.split_documents(data)  # 'data' is your PDF content

embed_model = "text-embedding-3-small"



openai.api_key = OPENAI_API_KEY
openai.api_base = "https://models.inference.ai.azure.com"



# Step 2: Generate Embeddings
def get_embeddings(texts):
    embeddings = []
    count = 0
    for i, text_chunk in enumerate(texts):
        print(text_chunk.page_content)
        print("########### EMBEDDING ##############")
        response = openai.Embedding.create(input=text_chunk.page_content, model=embed_model, dimensions=768)
        # max limit is 15 requests / 60 seconds
        time.sleep(4)
        embedding = response['data'][0]['embedding']
        print(embedding)
        
        # create a dictionary with id and values
        embedding_dict = {
            "id": text_chunk.page_content,
            "values": embedding
        }
        # Append the dictionary to the list
        embeddings.append(embedding_dict)
        if i==2:
            break
        count+=1
    return embeddings
    # return count


print(get_embeddings(texts))
# Call the function to get embeddings
#formatted_embeddings = get_embeddings(texts)

formatted_embeddings = [
    {"id": "A", "values": [0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1]},
    {"id": "B", "values": [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2]},
    {"id": "C", "values": [0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3]},
    {"id": "D", "values": [0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4]}
  ]


# Step 3: Upsert the Formatted Embeddings into PineCone with 559 vectors / upsert request. See the limits for each dimension here: https://docs.pinecone.io/guides/data/upsert-data#upsert-limits

batch_size = 559

# Process embeddings in chunks
for i in range(0, len(formatted_embeddings), batch_size):
    batch = formatted_embeddings[i:i + batch_size]
    # Upsert batch
    #upsert_data = [(id, embedding) for id, embedding in batch]
    #index.upsert(vectors=upsert_data)
    print(batch)
    #index.upsert(batch)
    print(f"Upserted batch {i // batch_size + 1}")

print(index.describe_index_stats())

query = "what are the best ways to invest my money?"
response = openai.Embedding.create(input=query, model=embed_model, dimensions=768)
embedding = response['data'][0]['embedding']


result = index.query(
    namespace="",
    vector=embedding, # real embeddings of the query
    top_k=3, # get only the top_k matches
    include_values=True
)
# print(result)

# get list of retrieved text

# adjust the format to get the id (the original text)
contexts = [item['metadata']['text'] for item in result['matches']]

augmented_query = "\n\n---\n\n".join(contexts)+"\n\n-----\n\n"+query

# system message to 'prime' the model
primer = f"""You are Q&A bot. A highly intelligent system that answers
user questions based on the information provided by the user above
each question. If the information can not be found in the information
provided by the user you truthfully say "I don't know".
"""

from openai import OpenAI
client = OpenAI(
    base_url="https://models.inference.ai.azure.com",
    api_key=OPENAI_API_KEY,
)
response = client.chat.completions.create(
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

print(response.choices[0].message.content)
#To display this response nicely, we will display it in markdown.
# from IPython.display import Markdown
# display(Markdown(response.choices[0].message.content)


# Non-Augmented query
response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": primer,
        },
        {
            "role": "user",
            "content": query,
        }
    ],
    model="gpt-4o",
    temperature=1,
    max_tokens=4096,
    top_p=1
)
print(response.choices[0].message.content)

# droppping the "I don't know" part of the primer
response = client.chat.completions.create(
    messages=[
        {
            "role": "system",
            "content": "You are Q&A bot. A highly intelligent system that answers user questions",
        },
        {
            "role": "user",
            "content": query,
        }
    ],
    model="gpt-4o",
    temperature=1,
    max_tokens=4096,
    top_p=1
)
print(response.choices[0].message.content)









####################################################################################################################
# Set up API key and endpoint
# openai.api_key = OPENAI_API_KEY

# openai.api_base = "https://models.inference.ai.azure.com"  # Azure endpoint

# # Define model name and parameters
# model_name = "gpt-4o"
