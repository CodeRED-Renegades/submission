import os
import sqlite3
from flask import Flask, send_from_directory
from flask_api import status as s

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
react_path = os.path.join(BASE_DIR, "frontend", "build")
db_path = os.path.join(BASE_DIR, "database", "sms.db")

app = Flask(__name__, static_url_path='', static_folder=react_path)
db = sqlite3.connect(db_path)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

