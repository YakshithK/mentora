# %%
!pip install transformers

# %%
from transformers import pipeline

# Load the emotion classification pipeline
classifier = pipeline("text-classification", model="bhadresh-savani/distilbert-base-uncased-emotion")

# Predict function
def classify_text(text):
    result = classifier(text)[0]  # returns a list of dicts, we take the first
    return {"label": result["label"]}


# %%
text = "I am happy!"

classify_text(text)

# %% [markdown]
# This gives us emotions, but the following model gives us either a postive or negative value which would work perfect with knowing either user needs to improve (negative feedback) or user is doing just fine (positive feedback)

# %%
classifer = pipeline("sentiment-analysis")

def classify_text(text):
  result = classifer(text)[0]
  return {"binary_label": result["label"]}


# %%
text = "I am happy!"

classify_text(text)

# %%
text = "I am highly disappointed in your work eithic."

classify_text(text)


