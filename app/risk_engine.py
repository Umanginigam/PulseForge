from typing import Dict, List

class RiskScoringEngine:
    def score(
        self,
        bias_analysis: Dict,
        verification: Dict,
        audience_reactions: List[Dict]
    ) -> Dict:

        # --- Components ---
        base_risk = bias_analysis["overall_risk"]          # 0.0 – 1.0
        verified_count = len(verification["verified_risks"])
        audience_flags = sum(
            1 for a in audience_reactions if a["risk"] is not None
        )

        # --- Normalized penalties ---
        verification_risk = min(verified_count * 0.2, 0.4)   # cap impact
        audience_risk = min(audience_flags * 0.1, 0.3)

        # --- Weighted sum ---
        total_risk = (
            (0.5 * base_risk) +
            (0.3 * verification_risk) +
            (0.2 * audience_risk)
        )

        total_risk = min(total_risk, 1.0)

        safety_score = round((1 - total_risk) * 100)

        if safety_score >= 80:
            status = "GREEN"
        elif safety_score >= 60:
            status = "YELLOW"
        else:
            status = "RED"

        return {
            "safety_score": safety_score,
            "status": status,
            "reason": {
                "base_risk": base_risk,
                "verification_risk": verification_risk,
                "audience_risk": audience_risk
            }
        }
