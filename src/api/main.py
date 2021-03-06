import os
import sqlite3
from pprint import pprint

source_path = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(source_path)
db_path = os.path.join(source_path, "database", "sms.db")
rel_db_path = os.path.relpath(db_path, BASE_DIR)



def get_all_incidents(startDate, endDate):
    db_path = os.path.join(source_path, "database", "sms.db")
    rel_db_path = os.path.relpath(db_path, BASE_DIR)
    db = sqlite3.connect(rel_db_path)
    cur = db.cursor()
    output = [] #list of dictionaries
    date = dict()

    if endDate.startswith("null") and not endDate.endswith('null'):
        endDate = "null"  

    if startDate == "null"  and endDate.startswith("null"):

        for row in cur.execute("SELECT Time FROM TEST"):

            y, m = ExctractDate(row)

            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})
          

    elif endDate.startswith("null"):

        commandStirng = f"SELECT Time FROM TEST WHERE Time > '{startDate}'"

        for row in cur.execute(commandStirng):
            y, m = ExctractDate(row)
            print(y,m,"\n")
            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})

    elif startDate.startswith("null"):
        commandStirng = f"SELECT Time FROM TEST WHERE Time < '{endDate}'"

        for row in cur.execute(commandStirng):
            y, m = ExctractDate(row)

            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})

    else:

        for row in cur.execute(f"SELECT Time FROM TEST WHERE Time BETWEEN '{startDate}' AND '{endDate}' "):
            print(row)
            y, m = ExctractDate(row)

            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})

    db.close()
    return output



def ExctractDate(Time):
    #Time[0] = "yyyy-mm-dd 00:00:00"
    newTime = Time[0].split('-')

    #newTime = ["yyyy" "mm" "dd 00:00:00"]
    month = newTime[1]
    newMonth = ""
    if month == "01":
        newMonth = "January"
    elif month == "02":
        newMonth = "February"
    elif month == "03":
        newMonth = "March"
    elif month == "04":
        newMonth = "April"
    elif month == "05":
        newMonth = "May"
    elif month == "06":
        newMonth = "June"
    elif month == "07":
        newMonth = "July"
    elif month == "08":
        newMonth = "August"
    elif month == "09":
        newMonth = "September"
    elif month == "10":
        newMonth = "October"
    elif month == "11":
        newMonth = "November"
    elif month == "12":
        newMonth = "December"

    return newTime[0], newMonth






def create_incident(incident):
    pprint(incident)
    query = """insert into TEST (
      Geolocation, 
      Manager_Name, 
      Department, 
      Type_of_Hazard, 
      Description, 
      Danger_Level, 
      Injury_Count, 
      Death_Count, 
      NearMiss) values (
         '{Geolocation}', 
         '{Manager_Name}', 
         '{Department}', 
         '{Type_of_Hazard}', 
         '{Description}', 
         {Danger_Level}, 
         {Injury_Count}, 
         {Death_Count}, 
         {NearMiss}
      );""".format(**incident)
    db = sqlite3.connect(rel_db_path)
    cur = db.cursor()
    cur.execute(query)
    db.commit()
    cur.close()
    return { "message": "incident created" }


def get_department_incidents(startDate, endDate):
    db_path = os.path.join(source_path, "database", "sms.db")
    rel_db_path = os.path.relpath(db_path, BASE_DIR)
    db = sqlite3.connect(rel_db_path)
    cur = db.cursor()

    output = {
        "Exploration": 0,
        "Drilling": 0,
        "Upstream": 0,
        "Downstream": 0,
        "Shipping": 0,
        "Trading": 0,
        "Refinement": 0,
        "Crude": 0,
        "Production": 0
    }

    if endDate.startswith("null") and not endDate.endswith('null'):
        endDate = "null"

    if startDate == "null"  and endDate.startswith("null"):
        for row in cur.execute("SELECT department FROM TEST"):
            output[row[0]] += 1
          
    elif endDate.startswith("null"):
        commandStirng = f"SELECT department FROM TEST WHERE Time > '{startDate}'"
        for row in cur.execute(commandStirng):
            output[row[0]] += 1

    elif startDate.startswith("null"):
        commandStirng = f"SELECT department FROM TEST WHERE Time < '{endDate}'"
        for row in cur.execute(commandStirng):
            output[row[0]] += 1

    else:
        for row in cur.execute(f"SELECT department FROM TEST WHERE Time BETWEEN '{startDate}' AND '{endDate}' "):
            output[row[0]] += 1

    db.close()
    return output


def get_location_incidents(startDate, endDate):
    db_path = os.path.join(source_path, "database", "sms.db")
    rel_db_path = os.path.relpath(db_path, BASE_DIR)
    db = sqlite3.connect(rel_db_path)
    cur = db.cursor()

    output = {
        "Houston": 0,
        "Dallas": 0,
        "Austin": 0,
        "Fort Worth": 0,
        "Waco": 0,
        "Katy": 0,
        "Sugar Land": 0,
        "Cypress": 0
    }

    if endDate.startswith("null") and not endDate.endswith('null'):
        endDate = "null"

    if startDate == "null"  and endDate.startswith("null"):
        for row in cur.execute("SELECT geolocation FROM TEST"):
            if row[0] == "Sugarland":
                output["Sugar Land"]  += 1
                continue
            output[row[0]] += 1
          
    elif endDate.startswith("null"):
        commandStirng = f"SELECT geolocation FROM TEST WHERE Time > '{startDate}'"
        for row in cur.execute(commandStirng):
            if row[0] == "Sugarland":
                output["Sugar Land"]  += 1
                continue
            output[row[0]] += 1

    elif startDate.startswith("null"):
        commandStirng = f"SELECT geolocation FROM TEST WHERE Time < '{endDate}'"
        for row in cur.execute(commandStirng):
            if row[0] == "Sugarland":
                output["Sugar Land"]  += 1
                continue
            output[row[0]] += 1

    else:
        for row in cur.execute(f"SELECT geolocation FROM TEST WHERE Time BETWEEN '{startDate}' AND '{endDate}' "):
            if row[0] == "Sugarland":
                output["Sugar Land"]  += 1
                continue
            output[row[0]] += 1

    db.close()
    return output