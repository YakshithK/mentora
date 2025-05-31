import tensorflow as tf
import tensorflow_hub as hub
from sklearn.cluster import KMeans
import numpy as np
import pandas as pd

# Example feedback sentences
feedback_sentences = [
    "Dear student, your discussion would have been better if you had tried to follow the proper discussion outline as indicated in the original prompt.",
    "You neglected to properly assess the requirements of the essay and represent it in your outline plus paragraph discussion.",
    "You were asked to discuss 2 points of view and then your personal opinion. You only discussed one point of view and your opinion.",
    "In terms of task accuracy, that would result in a score of 4 because your response to the required discussion is minimal.",
    "The failure of your opening statement, the paraphrasing sealed the failing score for your TA portion."
]

teacher_ids = ["teacher_A"] * len(feedback_sentences)

# 1. Embed sentences with Universal Sentence Encoder (TensorFlow Hub)
embed = hub.load("https://tfhub.dev/google/universal-sentence-encoder/4")
embeddings = embed(feedback_sentences).numpy()

# 2. Cluster embeddings dynamically with KMeans
num_clusters = 3
kmeans = KMeans(n_clusters=num_clusters, random_state=42)
clusters = kmeans.fit_predict(embeddings)

# 3. Placeholder sentiment scoring (strict vs. praise)
# For real use: load or fine-tune a TF text classification model
# Here we mock: assume sentences containing "better" or "neglected" are 'strict'
sentiments = ["strict" if any(word in sent.lower() for word in ["better", "neglected", "failing"]) else "neutral"
              for sent in feedback_sentences]

# 4. Build DataFrame and aggregate per teacher + dynamic topic
df = pd.DataFrame({
    "teacher": teacher_ids,
    "sentence": feedback_sentences,
    "cluster": clusters,
    "sentiment": sentiments
})

# Compute counts and strictness ratio per cluster
agg = (df
       .groupby(["teacher", "cluster", "sentiment"])
       .size()
       .unstack(fill_value=0)
      )

agg["total"] = agg.sum(axis=1)
agg["strict_ratio"] = agg.get("strict", 0) / agg["total"]

# 5. Map clusters to auto-generated labels
cluster_terms = {i: f"Topic {i}" for i in range(num_clusters)}
agg = agg.reset_index().rename(columns={"cluster": "topic"})
agg["topic_label"] = agg["topic"].map(cluster_terms)

# Display profile
profile = agg[["teacher", "topic_label", "strict_ratio"]]
import ace_tools as tools; tools.display_dataframe_to_user(name="Dynamic Grading Profile", dataframe=profile)