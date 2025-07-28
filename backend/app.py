from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch

app = FastAPI()

# ✅ Enable CORS for Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Load the model and tokenizer once at startup
checkpoint = "HuggingFaceTB/SmolLM-135M"
tokenizer = AutoTokenizer.from_pretrained(checkpoint)
model = AutoModelForCausalLM.from_pretrained(
    checkpoint
).to("cpu")  # ✅ Use CPU instead of GPU

# ✅ Request body schema
class Prompt(BaseModel):
    text: str

# ✅ Inference endpoint
@app.post("/generate")
async def generate_text(data: Prompt):
    inputs = tokenizer.encode(data.text, return_tensors="pt").to("cpu")  # ✅ Use CPU
    outputs = model.generate(inputs, max_new_tokens=50)
    result = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"response": result}
