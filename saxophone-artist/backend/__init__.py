from flask import Flask
from flask_mail import Mail
from flask_cors import CORS

mail = Mail()

def create_app():
    app = Flask(__name__)
    app.config.from_object("backend.config.Config")
    
    mail.init_app(app)
    CORS(app)

    from backend.contact_routes import contact
    app.register_blueprint(contact)

    return app
