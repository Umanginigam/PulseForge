from typing import Dict, List
from app.llm import call_llm


SYSTEM_PROMPT = """
You are a verification agent for an AI ethics system.

Your role:
- Evaluate whether detected risks are valid and meaningful
- Distinguish between:
  • isolated sensitivity
  • genuine judgmental or harmful framing
- Do NOT auto-confirm everything
- Do NOT dismiss clearly judgmental language

Return JSON only.
"""


class SelfVerificationAgent:
    def verify(
        self,
        content: str,
        bias_analysis: Dict,
        audience_reactions: List[Dict]
    ) -> Dict:

        verified_risks = []

        for phrase in bias_analysis["risky_phrases"]:
            user_prompt = f"""
CONTENT:
"{content}"

POTENTIAL ISSUE:
Phrase: "{phrase['phrase']}"
Issue: "{phrase['issue']}"
Severity: {phrase.get("severity", 0)}

AUDIENCE REACTIONS:
{audience_reactions}

TASK:
Decide if this issue is:
- genuinely problematic
- or acceptable/contextual

Return JSON:
{{
  "verified": true | false,
  "confidence": 0.0
}}
"""

            llm_response = call_llm(SYSTEM_PROMPT, user_prompt)

            if llm_response.get("verified"):
                verified_risks.append({
                    "phrase": phrase["phrase"],
                    "issue": phrase["issue"],
                    "verified": True,
                    "confidence": llm_response.get("confidence", 0.6)
                })

        return {
            "verified_risks": verified_risks,
            "verification_status": "confirmed" if verified_risks else "clean"
        }
