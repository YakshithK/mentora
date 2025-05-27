# model.py
import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel

class EssayGrader(nn.Module):
    def __init__(self, num_traits=3):
        super().__init__()
        self.encoder = AutoModel.from_pretrained("roberta-base")
        self.head = nn.Sequential(
            nn.Linear(768, 128),
            nn.ReLU(),
            nn.Linear(128, num_traits)
        )

    def forward(self, input_ids, attention_mask):
        x = self.encoder(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state[:, 0, :]
        return self.head(x)

tokenizer = AutoTokenizer.from_pretrained("roberta-base")
model = EssayGrader(num_traits=3)
model.load_state_dict(torch.load("model.pt", map_location="cpu"))
model.eval()
