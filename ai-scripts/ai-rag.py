import os
import click
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import CharacterTextSplitter
from langchain_astradb import AstraDBVectorStore
from langchain_huggingface import HuggingFaceEmbeddings
from helper.pdf import save_online_pdf
from helper.web_crawl import crawler


async def store_vectors():
    """Store document vectors into the AstraDB vector store."""

    pdf_or_web = os.getenv("PDF_OR_WEB")
    url = os.getenv("URL")
    collection_name = os.getenv("COLLECTION_NAME")
    namespace = os.getenv("NAMESPACE")
    astra_api_endpoint = os.getenv("ASTRA_API_ENDPOINT")
    astra_token = os.getenv("ASTRA_TOKEN")
    astra_namespace = os.getenv("ASTRA_NAMESPACE")

    env_vars = {
        "PDF_OR_WEB": pdf_or_web,
        "URL": url,
        "COLLECTION_NAME": collection_name,
        "NAMESPACE": namespace,
        "ASTRA_API_ENDPOINT": astra_api_endpoint,
        "ASTRA_TOKEN": astra_token,
        "ASTRA_NAMESPACE": astra_namespace
    }

    missing = [key for key, value in env_vars.items() if not value]
    if missing:
        raise ValueError(f"Missing required environment variables: {', '.join(missing)}")

    pdf_path = input("Enter the path to the PDF file (or leave blank to download): ").strip()
    
    if not pdf_path:
        raise ValueError("PDF path cannot be empty. Please provide a valid path or download the PDF.")
    
    if pdf_or_web == "pdf":
        pdf_path = save_online_pdf(url)
    elif pdf_or_web == "web":
        pdf_path = crawler(url)

    # Error handling if file is not found
    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF file not found at: {pdf_path}")

    pdf_loader = PyPDFLoader(pdf_path)
    documents = pdf_loader.load()

    text_splitter = CharacterTextSplitter(chunk_size=500, chunk_overlap=50)
    docs = text_splitter.split_documents(documents)

    embedding_model = "sentence-transformers/all-MiniLM-L6-v2"
    embeddings = HuggingFaceEmbeddings(model_name=embedding_model)

    spinner()

    vectorstore = AstraDBVectorStore(
        collection_name=collection_name,
        embedding=embeddings,
        api_endpoint=astra_api_endpoint,
        token=astra_token,
        namespace=astra_namespace,
    )

    vectorstore.add_documents(documents=docs)

    os.remove(pdf_path)

    click.echo(click.style("Stored vector embeddings ✅", fg="green"))

# Ensure the script can be run directly
if __name__ == "__main__":
    try:
        import asyncio
        asyncio.run(store_vectors())
    except FileNotFoundError as e:
        click.echo(click.style(str(e), fg="red"))
    except Exception as e:
        click.echo(click.style(f"An error occurred: {str(e)}", fg="red"))
