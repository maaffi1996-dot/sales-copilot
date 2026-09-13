"""
Thin wrapper around the AI provider so the rest of the backend never talks
to a specific SDK directly. This is the "swap the model later" abstraction
layer discussed in planning: everything else in the app calls generate_insight()
and answer_question(); only this file needs to change if you switch to a
self-hosted open-source model instead of the Anthropic API (relevant given
sanctions-related access constraints from Iran).
"""
import os

from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

_client: Anthropic | None = None


def get_client() -> Anthropic:
    global _client
    if _client is None:
        api_key = os.environ.get("ANTHROPIC_API_KEY")
        if not api_key:
            raise RuntimeError(
                "ANTHROPIC_API_KEY تنظیم نشده است. آن را در فایل .env قرار بده."
            )
        _client = Anthropic(api_key=api_key)
    return _client


MODEL = "claude-sonnet-5"


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
    response = client.messages.create(
        model=MODEL,
        max_tokens=1000,
        messages=[{"role": "user", "content": prompt}],
    )
    return "".join(block.text for block in response.content if hasattr(block, "text")).strip()
