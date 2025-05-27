import torch
from model import model, tokenizer
import PyPDF2
import re

def extract_text_from_pdf(pdf_path):
    reader = PyPDF2.PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text() + "\n"
    return text.strip()

def extract_rubric_structure(rubric_text):
    """
    Extract traits and max scores from rubric text using regex
    Returns list of {"trait": ..., "max_score": ...}
    """
    pattern = r"(\w+):\s*/(\d+)"
    matches = re.findall(pattern, rubric_text)
    structure = [{"trait": trait, "max_score": int(score)} for trait, score in matches]
    return structure

def format_model_input(rubric_text, prompt, essay_text):
    return f"[RUBRIC]\n{rubric_text}\n\n[PROMPT]\n{prompt}\n\n[ESSAY]\n{essay_text}"

def grade_essay(rubric_pdf, essay_pdf, prompt=""):
    # Extract text from files
    rubric_text = extract_text_from_pdf(rubric_pdf)
    essay_text = extract_text_from_pdf(essay_pdf)

    # Extract trait structure from rubric
    rubric_structure = extract_rubric_structure(rubric_text)
    num_traits = len(rubric_structure)

    # Format input for model
    model_input = format_model_input(rubric_text, prompt, essay_text)
    tokens = tokenizer(model_input, return_tensors="pt", truncation=True, padding=True)

    # Run model
    with torch.no_grad():
        outputs = model(**tokens).squeeze().tolist()

    # Print scores
    print("\n🎯 Essay Scores:")
    for i, r in enumerate(rubric_structure):
        score = round(outputs[i], 1)
        print(f" - {r['trait']}: {score} / {r['max_score']}")

    total_score = sum(outputs)
    total_max = sum(r["max_score"] for r in rubric_structure)
    print(f"\n📊 Total Score: {round(total_score, 1)} / {total_max}")

if __name__ == "__main__":
    rubric_path = "rubric.pdf"
    essay_path = "essay.pdf"
    prompt = "Create a 6–10 minute presentation inspired by a play we've studied."

    grade_essay(rubric_path, essay_path, prompt)
