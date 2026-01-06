from typing import Dict, List
from app.llm import call_llm


SYSTEM_PROMPT = """
You are a senior copy editor.

Your task:
- Rewrite content to remove judgmental or patronizing tone
- Preserve original intent
- Use supportive, inclusive language
- Do NOT over-sanitize or add moral lectures

Return clear, natural rewrites.
"""


class RewriteSuggestionAgent:
    def suggest_llm(self, content: str, verified_risks: List[Dict]) -> Dict:
        suggestions = []

        for risk in verified_risks:
            user_prompt = f"""
ORIGINAL CONTENT:
"{content}"

PROBLEMATIC PHRASE:
"{risk['phrase']}"

ISSUE:
"{risk['issue']}"

TASK:
Provide 3 improved rewrites that:
- Avoid judgment
- Sound respectful and supportive
- Keep marketing intent

Return JSON:
{{
  "alternatives": ["...", "...", "..."]
}}
"""
            llm_response = call_llm(SYSTEM_PROMPT, user_prompt)

            suggestions.append({
                "issue": risk["issue"],
                "original_phrase": risk["phrase"],
                "alternatives": llm_response.get("alternatives", [])
            })

        return {
            "original": content,
            "suggestions": suggestions
        }
