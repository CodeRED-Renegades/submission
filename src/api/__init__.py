import os
import sqlite3
from flask import Flask, send_from_directory
#from flask_api import status as s

source_path = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(source_path)
react_path = os.path.join(source_path, "frontend", "build")
db_path = os.path.join(source_path, "database", "sms.db")

app = Flask(__name__, static_url_path='', static_folder=react_path)




@app.route("/", defaults={'path':''})
def serve(path):

    db = sqlite3.connect(os.path.relpath(db_path, BASE_DIR))
    cur = db.cursor()

    #cur.execute("DROP TABLE IF EXISTS TEST")
    #cur.execute('CREATE TABLE IF NOT EXISTS TEST (Geolocation VARCHAR(50), Manager_Name VARCHAR(50), Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP, Department VARCHAR(50), Type_of_Hazard VARCHAR(50), Description VARCHAR(2000), Danger_Level INT, Injury_Count INT, Death_Count INT, NearMiss VARCHAR(5));')
    #cur.execute('INSERT INTO TEST (ID, Manager_Name) VALUES (1, "Adil Matt");')
    #cur.execute('''INSERT INTO TEST (Geolocation, Manager_Name, Department, Type_of_Hazard, Description, Danger_Level, Injury_Count, Death_Count, NearMiss) VALUES ('Houston', 'Ahmed Qureshi', 'Exploration', 'Oil Spill', 'There was an oil spill', 8, 999, 100, 'False')''')




    #cur.execute('select * from TEST')
    #for r in cur:
    #    print(r)
    #db.close()

    return send_from_directory(app.static_folder, 'index.html')

