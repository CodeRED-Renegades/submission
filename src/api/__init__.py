import os
import sqlite3
from flask import Flask, send_from_directory
from flask_api import status as s

source_path = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(source_path)
react_path = os.path.join(source_path, "frontend", "build")
db_path = os.path.join(source_path, "database", "sms.db")

app = Flask(__name__, static_url_path='', static_folder=react_path)
db = sqlite3.connect(os.path.relpath(db_path, BASE_DIR))

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

