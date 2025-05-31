"""Module for downloading PDFs from a given URL and saving them locally."""
import os
import requests

def save_online_pdf(pdf_url):
    """Download a PDF from a URL and save it as 'source.pdf'."""
    print(f"Attempting to download from: {pdf_url}")  # Debug the URL passed

    if not pdf_url.startswith(('http://', 'https://')):
        return "Invalid URL provided. URL should start with http:// or https://"

    file_name = os.path.join("source.pdf")  # Unified file name

    
    response = requests.get(pdf_url, stream=True, timeout=10)
    if response.status_code == 200:
        with open(file_name, "wb") as pdf_file:
            for chunk in response.iter_content(1024):
                pdf_file.write(chunk)

    return file_name if os.path.exists(file_name) else "Failed to download PDF."

