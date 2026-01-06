from typing import Dict
from app.llm import call_llm


SYSTEM_PROMPT = """
You are an AI ethics and bias auditor.

Your job is to detect:
- Judgmental language
- Stereotyping
- Moral labeling
- Demeaning or patronizing tone

IMPORTANT RULES:
- Do NOT be overly sensitive.
- Do NOT ignore clearly judgmental framing.
- Focus on how language frames people, not intent.
- Return structured JSON only.
"""


class BiasToneDetectionAgent:
    def analyze(self, content: str) -> Dict:
        user_prompt = f"""
CONTENT:
"{content}"

TASK:
1. Identify phrases that judge, stereotype, or demean people.
2. For each phrase, explain the issue briefly.
3. Assign a severity score (0.0–1.0) where:
   - 0.0 = no risk
   - 0.5 = moderate concern
   - 0.8+ = strong judgment or stereotyping

Return JSON ONLY in this format:
{{
  "risky_phrases": [
    {{
      "phrase": "...",
      "issue": "...",
      "severity": 0.0
    }}
  ]
}}
"""

        llm_response = call_llm(SYSTEM_PROMPT, user_prompt)

        risky_phrases = llm_response.get("risky_phrases", [])

        # --- Aggregate scores ---
        bias_score = 0.0
        tone_score = 0.0

        for r in risky_phrases:
            bias_score += r.get("severity", 0)

        bias_score = min(bias_score, 1.0)
        overall_risk = bias_score

        return {
            "risky_phrases": risky_phrases,
            "bias_score": round(bias_score, 2),
            "tone_score": round(tone_score, 2),
            "overall_risk": round(overall_risk, 2)
        }
