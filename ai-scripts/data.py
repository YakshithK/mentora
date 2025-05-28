import json
import csv
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np

print(" loading file...")
with open('leaf.jsonl', 'r', encoding='utf-8') as f:
    lines = f.readlines()

data = []
for line in lines:
    obj = json.loads(line)
    data.append({
        'split': obj['split'],
        'essay_text': obj['essay_text'],
        'human_feedback': obj['human_feedback_text']
    })

print(f"loaded {len(data)} essays.")

print("loading model...")
model_name = "KevSun/Engessay_grading_ML"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)
model.eval()
print(f"🚀 Model loaded on: {device}")

def get_grades(text):
    if not text or not isinstance(text, str) or text.strip() == "":
        return [1.0] * 6  # Default fail-safe values
    encoded_input = tokenizer(
        text, return_tensors='pt', padding=True, truncation=True, max_length=64
    ).to(device)

    with torch.no_grad():
        outputs = model(**encoded_input)

    predictions = outputs.logits.squeeze().cpu().numpy()
    item_names = ["cohesion", "syntax", "vocabulary", "phraseology", "grammar", "conventions"]
    scaled_scores = 2.25 * predictions - 1.25
    rounded_scores = [round(score * 2) / 2 for score in scaled_scores]
    return rounded_scores

print("starting grading...")
for i, item in enumerate(data):
    essay = item['essay_text']
    scores = get_grades(essay)
    item['grade'] = scores 
    if i % 50 == 0:
        print(f"processed {i}/{len(data)} essays...")


def write_csv(filtered_data, filename):
    with open(filename, 'w', newline='', encoding='utf-8') as f:
        fieldnames = ['essay_text', 'human_feedback', 'grade']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

        for row in filtered_data:
            # Only keep expected fields
            cleaned_row = {key: row[key] for key in fieldnames}
            writer.writerow(cleaned_row)


train_data = [d for d in data if d['split'] == 'train']
test_data  = [d for d in data if d['split'] == 'test']

print("writing csv files...")
write_csv(train_data, 'training.csv')
write_csv(test_data, 'testing.csv')

print("done! files saved: training.csv and testing.csv")
