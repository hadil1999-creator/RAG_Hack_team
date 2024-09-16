import os
import json
from dotenv import load_dotenv

# Add OpenAI import
from openai import AzureOpenAI

def main(): 
    try:
        # Flag to show citations
        show_citations = False

        # Get configuration settings 
        load_dotenv()
        azure_oai_endpoint = os.getenv("AZURE_OAI_FINETUNE_ENDPOINT2")
        azure_oai_key = os.getenv("AZURE_OAI_FINETUNE_KEY2")
        azure_oai_deployment = os.getenv("AZURE_OAI_FINETUNE_DEPLOYMENT2")
        azure_search_endpoint = os.getenv("AZURE_SEARCH_ENDPOINT")
        azure_search_key = os.getenv("AZURE_SEARCH_KEY")
        azure_search_index = os.getenv("AZURE_SEARCH_INDEX")
        
        # Initialize the Azure OpenAI client
        client = AzureOpenAI(
            base_url=f"{azure_oai_endpoint}/openai/deployments/{azure_oai_deployment}",
            api_key=azure_oai_key,
            api_version="2023-09-01-preview"
        )

        # Get the prompt
        text = input('\nEnter a question:\n')

        # Configure your data source for Azure Cognitive Search
        extension_config = dict(
            dataSources=[
                {
                    "type": "AzureCognitiveSearch",
                    "parameters": {
                        "endpoint": azure_search_endpoint,
                        "key": azure_search_key,
                        "indexName": azure_search_index,
                    }
                }
            ]
        )

        # Define system prompt to combine model's knowledge and documents
        system_prompt = """
        You are a financial advisor and an expert in investment. You have access to a wide variety of documents.
        Use your own knowledge to answer the question, and verify it or supplement it using the relevant documents when possible.
        """

        # Send request to Azure OpenAI model
        print("...Sending the following request to Azure OpenAI endpoint...")
        print("Request: " + text + "\n")

        # Send the prompt to the Azure OpenAI service
        response = client.chat.completions.create(
            model=azure_oai_deployment,
            temperature=0.5,
            max_tokens=1000,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": text}
            ], 
            # Use search data, but don't rely on it solely
        )
    

        # Handle the response
        if 'choices' in response and response.choices:
            print("Response: " + response.choices[0].message.content + "\n")
        else:
            print("No relevant information was found in the documents, but here's a general response:\n")
            # If no documents are found, fallback on model knowledge
            fallback_response = client.chat.completions.create(
                model=azure_oai_deployment,
                temperature=0.5,
                max_tokens=1000,
                messages=[
                    {"role": "system", "content": "Use your own knowledge to answer the question."},
                    {"role": "user", "content": text}
                ]
            )
            print("Response: " + fallback_response.choices[0].message.content + "\n")

        if show_citations:
            # Print citations if requested
            citations = response.choices[0].message.context.get("messages", [{}])[0].get("content", "")
            citation_json = json.loads(citations) if citations else {}
            if citation_json.get("citations"):
                print("Citations:")
                for c in citation_json["citations"]:
                    print(f"  Title: {c['title']}\n    URL: {c['url']}")
            else:
                print("No citations available.")

    except Exception as ex:
        print(ex)


if __name__ == '__main__': 
    main()
