import os
import json
import sqlite3
from flask import Flask, send_from_directory, request, jsonify
from flask_api import status as s
from flask_cors import CORS
from api.main import *

source_path = os.path.dirname(os.path.dirname(__file__))
react_path = os.path.join(source_path, "frontend", "build")

app = Flask(__name__, static_url_path='', static_folder=react_path)

CORS(app)

@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/api/incident", methods=['POST'])
def incidents():
    if request.method == 'POST':
        body = request.json
        return jsonify(create_incident(body)), s.HTTP_200_OK


@app.route("/api/incident/all/<startDate>/<endDate>", methods=['GET'])
def api_get_all_incidents(startDate, endDate):
    if request.method == 'GET':
        return jsonify(get_all_incidents(startDate, endDate)), s.HTTP_201_CREATED
