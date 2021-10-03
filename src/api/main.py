import os
import sqlite3

source_path = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(source_path)
db_path = os.path.join(source_path, "database", "sms.db")
rel_db_path = os.path.relpath(db_path, BASE_DIR)

def get_all_incidents(startDate, endDate):
   output = [] #list of dictionaries
   if startDate is None:
      #query all
      #select statement, convert each observation into dictionaries by month
      pass
   else:
      #query by date
      #select statement, convert each observation into dictionaries by month in a range
      pass
   return {"message":"hello from database"}

def create_incident(incident):
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