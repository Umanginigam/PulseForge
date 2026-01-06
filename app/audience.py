from typing import Dict
from app.llm import call_llm


SYSTEM_PROMPT = """
You are a cultural perception simulator.

Your role:
- Simulate how a specific audience persona would emotionally react to content
- Consider tone, politeness, cultural norms, and values
- Do not exaggerate risk
- Do not ignore clearly judgmental or disrespectful language

Return structured JSON only.
"""


class AudienceSimulationAgent:
    def simulate_llm(self, content: str, persona: Dict) -> Dict:
        user_prompt = f"""
CONTENT:
"{content}"

PERSONA:
Culture: {persona['culture']}
Age Group: {persona['age_group']}
Values: {persona['values']}
Tone Sensitivity: {persona['tone_sensitivity']}

TASK:
1. Describe the audience's emotional reaction in 1–2 sentences
2. Decide if there is a tone or cultural risk

Return JSON in this exact format:
{{
  "reaction": "...",
  "risk": null | "Tone mismatch" | "Cultural sensitivity"
}}
"""

        llm_response = call_llm(SYSTEM_PROMPT, user_prompt)

        return {
            "persona_id": persona["id"],
            "culture": persona["culture"],
            "reaction": llm_response.get("reaction", "neutral"),
            "risk": llm_response.get("risk"),
        }
