from flask import Blueprint, request, jsonify
import requests
import os
from dotenv import load_dotenv
from pathlib import Path

# 🔐 Načteme .env ze složky root projektu
env_path = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=env_path)

ai_chat = Blueprint("ai_chat", __name__)
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

@ai_chat.route("/api/ai-chat", methods=["POST"])
def ai_chat_endpoint():
    data = request.get_json()
    user_message = data.get("message")

    if not user_message:
        return jsonify({"error": "Missing message"}), 400

    if not DEEPSEEK_API_KEY:
        print("❌ DEEPSEEK_API_KEY není nastaven. Zkontroluj .env soubor.")
        return jsonify({"error": "Server error: missing API key."}), 500

    print("✅ Používám klíč:", DEEPSEEK_API_KEY[:10] + "...")

    try:
        response = requests.post(
            "https://api.deepseek.com/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
                "Content-Type": "application/json"
            },
            json={
                "model": "deepseek-chat",
                "messages": [
                    {"role": "system", "content": "You are a helpful assistant for saxophonist Adam Nukorev."},
                    {"role": "user", "content": user_message}
                ]
            }
        )
        response.raise_for_status()
        json_data = response.json()

        if "choices" in json_data and len(json_data["choices"]) > 0:
            answer = json_data["choices"][0]["message"]["content"]
            return jsonify({"reply": answer})
        else:
            return jsonify({"error": "Invalid response from AI"}), 500

    except requests.exceptions.HTTPError as http_err:
        print("❌ HTTP chyba:", http_err)
        return jsonify({"error": "AI server returned an error."}), 500
    except Exception as e:
        print("❌ Neznámá chyba:", e)
        return jsonify({"error": "Failed to get AI response."}), 500
