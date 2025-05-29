"""Helper module for querying LLM with context from AstraDB vector store."""

import os
import json
import requests
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

ASTRA_DB_API_ENDPOINT = os.getenv("ASTRA_DB_API_ENDPOINT")
ASTRA_DB_APPLICATION_TOKEN = os.getenv("ASTRA_DB_APPLICATION_TOKEN")
ASTRA_DB_NAMESPACE = os.getenv("ASTRA_DB_NAMESPACE")
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def query_model(context, query):
    """Query the Groq LLM API with a given context and user query."""
    system_prompt = "Roleplay as a Q&A chatbot."

    prompt = (
        "Use the following context to answer the question. Think about the contents of the context "
        "carefully to formulate a specific and accurate answer based on the query given.\n"
        "If you don't know the answer, just say that you don't know.\n\n"
        f"Context: {context}\nQuery: {query}"
    )

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {GROQ_API_KEY}"
    }
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt}
        ]
    }

    try:
        response = requests.post(url, headers=headers, json=data, timeout=10)
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]
    except requests.exceptions.Timeout:
        return "The request timed out. Please try again later."
    except requests.exceptions.RequestException as e:
        return f"Request error occurred: {str(e)}"
    except json.JSONDecodeError:
        return "Failed to parse response from LLM API."
    except (KeyError, IndexError):
        return "Unexpected response format from LLM API."