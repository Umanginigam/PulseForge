import os
import json
from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("GITHUB_TOKEN"),
    base_url="https://models.inference.ai.azure.com",
)

MODEL = os.getenv("GITHUB_MODEL", "gpt-4o")


def call_llm(system_prompt: str, user_prompt: str) -> dict:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.2,
    )

    raw = response.choices[0].message.content

    try:
        return json.loads(raw)
    except json.JSONDecodeError:
        # SAFE FALLBACK (never crash production)
        return {}
