from flask import Blueprint, send_from_directory
from flask_api import status as s

app = Blueprint('main', __name__)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

