import numpy as np
import joblib
from tensorflow.keras.models import load_model
import spacy
import json

model = load_model(r'ai-scripts\assets\category_model.h5')
vectorizer = joblib.load(r'ai-scripts\assets\category_vectorizer.joblib')
le = joblib.load(r'ai-scripts\assets\category_labelencoder.joblib')

nlp = spacy.load("en_core_web_sm")

def sent_tokenize(text):
    doc = nlp(text)
    return [sent.text.strip() for sent in doc.sents]

def predict(sentence):
    vec = vectorizer.transform([sentence]).toarray()
    prediction = model.predict(vec)
    predicted_class = le.inverse_transform([np.argmax(prediction)])
    return predicted_class[0]

def categorize_feedback(feedback):
    sentences = sent_tokenize(feedback)
    results = []
    prev_category = None
    combined_text = ""
    category_counts = {}
    sentence_categories = []
    for sentence in sentences:
        category = predict(sentence)
        sentence_categories.append(category)
        category_counts[category] = category_counts.get(category, 0) + 1
        if category == prev_category:
            combined_text += " " + sentence
        else:
            if prev_category is not None:
                results.append({"text": combined_text.strip(), "category": prev_category})
            combined_text = sentence
            prev_category = category
    if combined_text:
        results.append({"text": combined_text.strip(), "category": prev_category})
    return json.dumps({"results": results, "category_counts": category_counts}, ensure_ascii=False)

feedback = "Great connections! You explain them very well."
print(categorize_feedback(feedback))
