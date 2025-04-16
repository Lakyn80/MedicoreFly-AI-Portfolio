# backend/contact_routes.py
from flask import Blueprint, request, jsonify
from flask_mail import Message
from . import mail

contact = Blueprint("contact", __name__)

@contact.route("/api/contact", methods=["POST"])
def send_contact_email():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    message = data.get("message")
    lang = data.get("lang", "ru")

    if not name or not email or not message:
        return jsonify({"error": "All fields are required."}), 400

    # 📩 E-mail adminovi
    admin_msg = Message(
        subject=f"Новое сообщение от {name}",
        sender="artemodernoblaha@gmail.com",
        recipients=["artemodernoblaha@gmail.com"],
        body=f"Имя: {name}\nEmail: {email}\n\nСообщение:\n{message}"
    )

    # 🧠 Výběr HTML obsahu podle jazyka
    if lang == "en":
        html_content = f"""
        <html><body style="font-family: Arial, sans-serif;">
        <div style="max-width:600px;margin:auto;padding:30px;background:#fff;border-radius:8px;">
          <img src="https://i.postimg.cc/kgJWCncC/logo.jpg" alt="Logo" style="max-width:150px;margin-bottom:20px;">
          <h2>Thank you for your message, {name}!</h2>
          <p>We have received your request and will get back to you shortly.</p>
          <p>📱 Phone: +7 916 123 45 67<br>💬 Telegram: <a href="https://t.me/mfly6f1">@mfly6f1</a></p>
          <p>Sincerely,<br><strong>Adam Nukorev</strong><br>Saxophonist & Composer</p>
        </div></body></html>
        """
    elif lang == "de":
        html_content = f"""
        <html><body style="font-family: Arial, sans-serif;">
        <div style="max-width:600px;margin:auto;padding:30px;background:#fff;border-radius:8px;">
          <img src="https://i.postimg.cc/kgJWCncC/logo.jpg" alt="Logo" style="max-width:150px;margin-bottom:20px;">
          <h2>Vielen Dank für Ihre Nachricht, {name}!</h2>
          <p>Wir haben Ihre Anfrage erhalten und melden uns in Kürze.</p>
          <p>📱 Telefon: +7 916 123 45 67<br>💬 Telegram: <a href="https://t.me/mfly6f1">@mfly6f1</a></p>
          <p>Mit freundlichen Grüßen,<br><strong>Adam Nukorev</strong><br>Saxophonist & Komponist</p>
        </div></body></html>
        """
    else:
        html_content = f"""
        <html><body style="font-family: Arial, sans-serif;">
        <div style="max-width:600px;margin:auto;padding:30px;background:#fff;border-radius:8px;">
          <img src="https://i.postimg.cc/kgJWCncC/logo.jpg" alt="Logo" style="max-width:150px;margin-bottom:20px;">
          <h2 style="color: #2c3e50;">Спасибо за ваше сообщение, {name}!</h2>
          <p style="font-size: 16px; color: #333;">
            Мы получили вашу заявку и свяжемся с вами в ближайшее время.
          </p>
          <p style="font-size: 16px; color: #333; margin-top: 20px;">
            📱 Телефон: +7 916 123 45 67<br>
            💬 Telegram: <a href="https://t.me/mfly6f1" style="color: #1d72b8;">@mfly6f1</a>
          </p>
          <p style="font-size: 14px; color: #666; margin-top: 30px;">
            С уважением,<br>
            <strong>Adam Nukorev</strong><br>
            Saxophonist & Composer
          </p>
        </div></body></html>
        """

    # 📩 E-mail klientovi
    client_msg = Message(
        subject={
            "en": "Thank you for your message!",
            "de": "Vielen Dank für Ihre Nachricht!",
            "ru": "Спасибо за ваше сообщение!"
        }.get(lang, "Спасибо за ваше сообщение!"),
        sender="artemodernoblaha@gmail.com",
        recipients=[email],
        html=html_content
    )

    try:
        mail.send(admin_msg)
        mail.send(client_msg)
        return jsonify({"message": "Emails sent successfully!"}), 200
    except Exception as e:
        print("❌ EMAIL SEND ERROR:", e)
        return jsonify({"error": "Failed to send email."}), 500
