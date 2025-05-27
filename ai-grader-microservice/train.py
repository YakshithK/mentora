# train.py
import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import AutoTokenizer, AutoModel

class EssayDataset(Dataset):
    def __init__(self, df, tokenizer):
        self.df = df
        self.tokenizer = tokenizer

    def __len__(self):
        return len(self.df)

    def __getitem__(self, idx):
        row = self.df.iloc[idx]
        print(f"[Dataset] Processing row {idx}")
        input_text = f"[PROMPT]\n{row['prompt']}\n\n[ESSAY]\n{row['essay']}"
        tokens = self.tokenizer(input_text, return_tensors="pt", padding='max_length', truncation=True, max_length=512)
        label_values = [float(row[trait]) if pd.notnull(row[trait]) else 0.0 for trait in ["content", "organization", "language"]]
        labels = torch.tensor(label_values, dtype=torch.float)
        return {
            "input_ids": tokens["input_ids"].squeeze(),
            "attention_mask": tokens["attention_mask"].squeeze(),
            "labels": labels
        }

class EssayGrader(nn.Module):
    def __init__(self, num_traits=3):
        super().__init__()
        print("[Model] Initializing EssayGrader model...")
        self.encoder = AutoModel.from_pretrained("roberta-base")
        self.head = nn.Sequential(
            nn.Linear(768, 128),
            nn.ReLU(),
            nn.Linear(128, num_traits)
        )

    def forward(self, input_ids, attention_mask):
        print(f"[Model] Forward pass with input_ids shape: {input_ids.shape}")
        x = self.encoder(input_ids=input_ids, attention_mask=attention_mask).last_hidden_state[:, 0, :]
        return self.head(x)

def train():
    print("[Train] Loading data...")
    df = pd.read_csv("DREsS_Std.tsv", sep="\t")
    df[["content", "organization", "language"]] = df[["content", "organization", "language"]].astype(float)

    print("[Train] Initializing tokenizer and dataset...")
    tokenizer = AutoTokenizer.from_pretrained("roberta-base")
    dataset = EssayDataset(df, tokenizer)
    dataloader = DataLoader(dataset, batch_size=4, shuffle=True)
    print(f"[Train] Number of batches per epoch: {len(dataloader)}")

    print("[Train] Initializing model and optimizer...")
    model = EssayGrader(num_traits=3)
    optimizer = torch.optim.AdamW(model.parameters(), lr=2e-5)
    loss_fn = nn.MSELoss()

    model.train()
    for epoch in range(3):
        print(f"[Train] Starting epoch {epoch+1}...")
        total_loss = 0
        for batch_idx, batch in enumerate(dataloader):
            print(f"[Train] Batch {batch_idx+1}")
            input_ids = batch["input_ids"]
            attention_mask = batch["attention_mask"]
            labels = batch["labels"]

            preds = model(input_ids=input_ids, attention_mask=attention_mask)
            loss = loss_fn(preds, labels)

            print(f"[Train] Loss: {loss.item():.4f}")
            loss.backward()
            optimizer.step()
            optimizer.zero_grad()

            total_loss += loss.item()

        print(f"[rrain] epoch {epoch+1} Loss: {total_loss:.4f}")

    torch.save(model.state_dict(), "model.pt")
    print("model saved as model.pt")

if __name__ == "__main__":
    train()
