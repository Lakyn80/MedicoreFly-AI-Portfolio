from flask import Flask
from flask_cors import CORS
from backend.extensions import mail
from backend.ai_agent_medicore.ai_chat_routes import ai_chat
from backend.contact_routes import contact
from backend.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    mail.init_app(app)
    CORS(app)

    app.register_blueprint(contact)
    app.register_blueprint(ai_chat)

    return app
