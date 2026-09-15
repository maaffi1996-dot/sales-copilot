"""
Thin wrapper around the AI provider so the rest of the backend never talks
to a specific SDK directly. Currently wired to DeepSeek (their billing
accepted an Iranian-issued card during testing, unlike Anthropic's).
DeepSeek's API is OpenAI-compatible, so we use the `openai` SDK pointed at
DeepSeek's base URL.
"""
import os

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

_client: OpenAI | None = None


def get_client() -> OpenAI:
    global _client
    if _client is None:
        api_key = os.environ.get("DEEPSEEK_API_KEY")
        if not api_key:
            raise RuntimeError(
                "DEEPSEEK_API_KEY تنظیم نشده است. آن را در فایل .env قرار بده."
            )
        _client = OpenAI(api_key=api_key, base_url="https://api.deepseek.com")
    return _client


MODEL = "deepseek-chat"


def generate_insight(summary: dict) -> str:
    prompt = (
        "تو یک تحلیلگر فروش فارسی‌زبان هستی. بر اساس داده‌های زیر یک تحلیل کوتاه "
        "(حداکثر ۱۱۰ کلمه) به زبان فارسی ساده بنویس: چه اتفاقی برای فروش افتاده، "
        "محتمل‌ترین علت آن، و یک پیشنهاد عملی. فقط متن تحلیل را بنویس، بدون مقدمه.\n\n"
        f"داده‌ها:\n{summary}"
    )
    return _complete(prompt)


def answer_question(question: str, context: str) -> str:
    prompt = (
        "تو دستیار تحلیل فروش یک فروشگاه زنجیره‌ای ایرانی هستی. با توجه به این داده "
        "نمونه، به سؤال کاربر در حداکثر ۹۰ کلمه و به زبان فارسی ساده پاسخ بده. فقط "
        f"پاسخ را بنویس.\n\nداده: {context}\n\nسؤال: {question}"
    )
    return _complete(prompt)


def _complete(prompt: str) -> str:
    client = get_client()
    response = client.chat.completions.create(
        model=MODEL,
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}],
    )
    return (response.choices[0].message.content or "").strip()
