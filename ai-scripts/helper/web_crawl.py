"""Module for crawling a webpage, extracting text, and saving it as a PDF."""

import requests
from bs4 import BeautifulSoup
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
import os 

FILENAME = "source.pdf"

def crawler(url):
    """Crawl the specified URL and save the extracted text as a PDF."""
    try:
        response = requests.get(url, timeout=10)  # Added timeout
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        return f"Request failed: {e}"

    soup = BeautifulSoup(response.text, 'html.parser')
    for script in soup(["script", "style"]):
        script.decompose()

    text = soup.get_text(separator='\n', strip=True)

    pdf = canvas.Canvas(FILENAME, pagesize=letter)
    _, height = letter  # Removed unused variable 'width'
    y = height - 50

    for line in text.splitlines():
        if y < 50:
            pdf.showPage()
            y = height - 50
        pdf.drawString(50, y, line[:90])
        y -= 15

    pdf.save()
    return FILENAME if os.path.exists(FILENAME) else "Failed to create PDF."