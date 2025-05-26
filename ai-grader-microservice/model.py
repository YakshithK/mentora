import torch
import torch.nn as nn
from transformers import AutoTokenizer, AutoModel

class Grader(nn.Module):
    def __init__(self, num_traits=4):
        super().__init__()
        self.encoder = AutoModel.from_pretrained("roberta-base")