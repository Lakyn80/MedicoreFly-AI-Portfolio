# run.py
from dotenv import load_dotenv
load_dotenv()  # Načítá .env z backend/.env

from backend import create_app

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
