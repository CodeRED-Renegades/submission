import os
import sqlite3

source_path = os.path.dirname(os.path.dirname(__file__))
BASE_DIR = os.path.dirname(source_path)
db_path = os.path.join(source_path, "database", "sms.db")
rel_db_path = os.path.relpath(db_path, BASE_DIR)
db = sqlite3.connect(os.path.relpath(db_path, BASE_DIR))

    db_path = os.path.join(source_path, "database", "sms.db")
    db = sqlite3.connect(os.path.relpath(db_path, BASE_DIR))
    cur = db.cursor()
    output = [] #list of dictionaries
    date = dict()

    if startDate == "null"  and endDate.startswith("null"):
    if startDate is None:
      #query all
      
        print("this is running \n")
        for row in cur.execute("SELECT Time FROM TEST"):
            #print(row)
            y, m = ExctractDate(row)
            print(y,m,"\n")
            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})
          

    elif endDate.startswith("null"):
        print(startDate)
        commandStirng = f"SELECT Time FROM TEST WHERE Time > '{startDate}'"
        print(commandStirng)
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
            print(y,m,"\n")
            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})

    else:
        #query by date
        #select statement, convert each observation into dictionaries by month in a range

        #startDate = endDate = yyyy-mm-dd 00:00:00
        
        for row in cur.execute(f"SELECT Time FROM TEST WHERE Time BETWEEN '{startDate}' AND '{endDate}' "):
            y, m = ExctractDate(row)
            print(y,m,"\n")
            key = (m, y)
            if key in date:
                date[key] += 1
            else:
                date[key] = 1

        for key in date:
            output.append({"month": key[0], "year": key[1], "count": date[key]})



    #for row in cur:
    #    print(row)

    #    y, m = ExctractDate(row)
    #    print(y,m,"\n")
    #    key = (m, y)
    #    if key in date:
    #        date[key] += 1
    #    else:
    #        date[key] = 1

    #for key in date:
    #    output.append({"month": key[0], "year": key[1], "count": date[key]})

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
   return { "message": "incident created" }   return {"message":"hello from database"}