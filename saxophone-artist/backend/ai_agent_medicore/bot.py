import os
import logging
import requests
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, ContextTypes, MessageHandler, CommandHandler, CallbackQueryHandler, filters
from dotenv import load_dotenv

load_dotenv()

TELEGRAM_TOKEN = os.getenv("TELEGRAM_TOKEN")
DEEPSEEK_API_KEY = os.getenv("DEEPSEEK_API_KEY")

logging.basicConfig(level=logging.INFO)

# 🧠 Volání DeepSeek API
def ask_deepseek(prompt):
    url = "https://api.deepseek.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {DEEPSEEK_API_KEY}",
        "Content-Type": "application/json",
    }
    data = {
        "model": "deepseek-chat",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful assistant for saxophonist Adam Nukorev. Answer questions in a clear, elegant style."
            },
            {"role": "user", "content": prompt}
        ]
    }
    response = requests.post(url, headers=headers, json=data)
    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]

# 💬 Když přijde zpráva
async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_message = update.message.text
    user_id = update.effective_user.id
    logging.info(f"Zpráva od uživatele {user_id}: {user_message}")

    try:
        response = ask_deepseek(user_message)
        await update.message.reply_text(
            response,
            reply_markup=InlineKeyboardMarkup([[
                InlineKeyboardButton("📩 Kontaktovat Adama", callback_data="contact_adam")
            ]])
        )
    except Exception as e:
        logging.error(f"Chyba při dotazu na DeepSeek: {e}")
        await update.message.reply_text("⚠️ Došlo k chybě při zpracování odpovědi.")

# 📩 Kontaktování Adama s uložením admin ID
async def handle_contact_adam(update: Update, context: ContextTypes.DEFAULT_TYPE):
    query = update.callback_query
    user = query.from_user
    await query.answer()

    admin_file = "admin_id.txt"

    if not os.path.exists(admin_file):
        with open(admin_file, "w") as f:
            f.write(str(user.id))
        admin_id = user.id
    else:
        with open(admin_file, "r") as f:
            admin_id = int(f.read().strip())

    try:
        await context.bot.send_message(
            chat_id=admin_id,
            text=f"📨 Uživatel {user.full_name} (@{user.username}) chce kontaktovat Adama.\n\nZpráva:\n{query.message.text}"
        )
        await query.edit_message_text("✅ Požadavek na spojení byl odeslán. Adam se vám brzy ozve.")
    except Exception as e:
        logging.error("❌ Chyba při odesílání zprávy adminovi:", exc_info=e)
        await query.edit_message_text("❌ Nepodařilo se spojit s Adamem. Zkuste to prosím později.")

# ▶️ /start příkaz
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    logging.info(f"/start od uživatele ID: {user_id}")
    await update.message.reply_text(
        "🎷 Привет! Я AI-помощник саксофониста Адама Нукорева. Задайте вопрос или нажмите кнопку ниже для связи.",
        reply_markup=InlineKeyboardMarkup([[
            InlineKeyboardButton("📩 Связаться с Адамом", callback_data="contact_adam")
        ]])
    )

# 🚀 Spuštění bota
def main():
    app = ApplicationBuilder().token(TELEGRAM_TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.add_handler(CallbackQueryHandler(handle_contact_adam, pattern="contact_adam"))
    app.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    app.run_polling()

if __name__ == "__main__":
    main()
