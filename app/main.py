from fastapi import FastAPI
from app.orchestrator import OrchestratorAgent
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="PulseForge")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

orchestrator = OrchestratorAgent()

@app.post("/analyze")
def analyze_content(payload: dict):
    content = payload.get("content", "")
    return orchestrator.run(content)
