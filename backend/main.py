import os

from dotenv import load_dotenv
from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from app.ai import answer_question, generate_insight
from app.analysis import analyze_sales, read_uploaded_file
from app.schemas import AnalyzeResponse, AskRequest, AskResponse

load_dotenv()

app = FastAPI(title="Sales Copilot API")

frontend_origin = os.environ.get("FRONTEND_ORIGIN", "http://localhost:3000")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze(file: UploadFile = File(...)):
    raw = await file.read()
    df = read_uploaded_file(file.filename or "upload.xlsx", raw)
    result = analyze_sales(df)

    try:
        insight = generate_insight(result)
    except Exception as exc:  # noqa: BLE001
        insight = (
            "اتصال به سرویس تحلیل با خطا مواجه شد. اعداد بالا معتبرند، فقط متن "
            "تحلیل موقتاً در دسترس نیست."
        )

    return {**result, "insight": insight}


@app.post("/api/ask", response_model=AskResponse)
def ask(payload: AskRequest):
    try:
        answer = answer_question(payload.question, payload.context)
    except Exception as exc:  # noqa: BLE001
        raise HTTPException(
            status_code=502, detail="اتصال به سرویس تحلیل با خطا مواجه شد."
        ) from exc
    return {"answer": answer}
