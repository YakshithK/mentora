from category_ai import categorize_feedback
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

def grade_essay(essay, feedback=None):
    if feedback is None:
        feedback = (
            "Your essay presents clear arguments and relevant examples, but some ideas could be more fully developed. "
            "The language is generally appropriate, with a good range of vocabulary, though there are occasional awkward phrases. "
            "Grammar and mechanics are mostly accurate, but there are a few errors in sentence structure and punctuation."
        )
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

essay = (
    "It is important for all towns and cities to have large public spaces such as squares and parks. "
    "Do you agree or disagree with this statement? It is crucial for all metropolitan cities and towns to "
    "have some recreational facilities like parks and squares because of their numerous benefits. A number of "
    "arguments surround my opinion, and I will discuss it in upcoming paragraphs. To commence with, the first "
    "and the foremost merit is that it is beneficial for the health of people because in morning time they can "
    "go for walking as well as in the evenings, also older people can spend their free time with their loved ones, "
    "and they can discuss about their daily happenings. In addition, young people do lot of exercise in parks and "
    "gardens to keep their health fit and healthy, otherwise if there is no park they glue with electronic gadgets "
    "like mobile phones and computers and many more. Furthermore, little children get best place to play, they play "
    "with their friends in parks if any garden or square is not available for kids then they use roads and streets "
    "for playing it can lead to serious incidents. Moreover, parks have some educational value too, in schools, "
    "students learn about environment protection in their studies and teachers can take their pupils to parks because "
    "students can see those pictures so lively which they see in their school books and they know about importance "
    "and protection of trees and flowers. In recapitulate, parks holds immense importance regarding education, health "
    "for people of every society, so government should build parks in every city and town."
)
print(grade_essay(essay))
