from helper.category_ai import categorize_feedback
import json
from transformers import AutoModelForSequenceClassification, AutoTokenizer
import torch

sentiment_model_name = "cardiffnlp/twitter-roberta-base-sentiment"
sentiment_tokenizer = AutoTokenizer.from_pretrained(sentiment_model_name)
sentiment_model = AutoModelForSequenceClassification.from_pretrained(sentiment_model_name)

label_to_score = {"negative": 9, "neutral": 5, "positive": 2}

def get_sentiment_score(feedback: str, category: str) -> float:
    input_text = f"Category: {category}. Feedback: {feedback}"
    encoded_input = sentiment_tokenizer(input_text, return_tensors='pt', truncation=True)
    with torch.no_grad():
        output = sentiment_model(**encoded_input)
    scores = output.logits.softmax(dim=1).squeeze().tolist()
    labels = ["negative", "neutral", "positive"]
    strictness = sum(label_to_score[label] * float(score) for label, score in zip(labels, scores))
    return round(strictness, 1)

def generate_personalization(feedback=None):
   
    feedback_json = categorize_feedback(feedback)
    feedback_data = json.loads(feedback_json)
    feedback_categories = feedback_data["results"]
    for item in feedback_categories:
        item["sentiment_score"] = float(get_sentiment_score(item["text"], item["category"]))

    return json.dumps({
        "categories": feedback_categories,
        "feedback": feedback,
        "category_counts": feedback_data["category_counts"]
    }, ensure_ascii=False)