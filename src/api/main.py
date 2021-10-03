import os
import sqlite3

source_path = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(source_path)
db_path = os.path.join(source_path, "database", "sms.db")
#database from the path
db = sqlite3.connect(os.path.relpath(db_path, BASE_DIR))

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