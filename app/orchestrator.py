from app.personas import PERSONAS
from app.audience import AudienceSimulationAgent
from app.bias_detector import BiasToneDetectionAgent
from app.verifier import SelfVerificationAgent
from app.rewriter import RewriteSuggestionAgent
from app.risk_engine import RiskScoringEngine


class OrchestratorAgent:
    def __init__(self):
        self.audience_agent = AudienceSimulationAgent()
        self.bias_agent = BiasToneDetectionAgent()
        self.verifier_agent = SelfVerificationAgent()
        self.rewrite_agent = RewriteSuggestionAgent()
        self.risk_engine = RiskScoringEngine()

    def run(self, content: str):
        # -----------------------------
        # 1. RULE-BASED AUDIENCE SIMULATION
        # -----------------------------
        audience_results = [
            self.audience_agent.simulate_llm(content, p)
            for p in PERSONAS
        ]

        # -----------------------------
        # 2. RULE-BASED BIAS DETECTION
        # -----------------------------
        bias_analysis = self.bias_agent.analyze(content)

        # -----------------------------
        # 3. DECIDE IF LLM IS NEEDED
        # -----------------------------
        use_llm = bias_analysis["overall_risk"] >= 0.4

        # -----------------------------
        # 4. LLM-BASED AUDIENCE (OPTIONAL)
        # -----------------------------
        if use_llm:
            audience_results = [
                self.audience_agent.simulate_llm(content, p)
                for p in PERSONAS
            ]

        # -----------------------------
        # 5. SELF-VERIFICATION
        # -----------------------------
        verification = self.verifier_agent.verify(
            content,
            bias_analysis,
            audience_results
        )

        # -----------------------------
        # 6. LLM-BASED REWRITES (ONLY IF VERIFIED ISSUES)
        # -----------------------------
        if verification["verified_risks"]:
            rewrites = self.rewrite_agent.suggest_llm(content,
                                                      verification["verified_risks"])

            
        else:
            rewrites = self.rewrite_agent.suggest_llm(
                content,
                []
            )

        # -----------------------------
        # 7. FINAL RISK SCORING
        # -----------------------------
        risk_score = self.risk_engine.score(
            bias_analysis,
            verification,
            audience_results
        )

        return {
            "status": "completed",
            "content": content,
            "llm_used": use_llm,
            "risk_assessment": risk_score,
            "audience_reactions": audience_results,
            "verified_risks": verification,
            "rewrite_suggestions": rewrites
        }
