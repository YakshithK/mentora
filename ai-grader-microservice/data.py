import json
import csv

input_path = "leaf.jsonl"
output_path = "essays_and_feedback.csv"

with open(input_path, "r", encoding="utf-8") as infile, open(output_path, "w", encoding="utf-8", newline="") as outfile:
    writer = csv.writer(outfile)
    writer.writerow(["essay_text", "human_feedback_text"])
    for line in infile:
        if not line.strip() or line.strip().startswith("//"):
            continue
        data = json.loads(line)
        essay = data.get("essay_text", "")
        feedback = data.get("human_feedback_text", "")
        writer.writerow([essay, feedback])