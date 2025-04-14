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

    if not name or not email or not message:
        return jsonify({"error": "Missing fields"}), 400

    msg = Message(
        subject=f"New message from {name}",
        sender="your_email@gmail.com",
        recipients=["your_email@gmail.com"],
        body=f"From: {name} <{email}>\n\n{message}"
    )

    try:
        mail.send(msg)
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to send email"}), 500
