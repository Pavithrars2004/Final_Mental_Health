import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
cred=credentials.Certificate("hackathon-f91a0-firebase-adminsdk-fbsvc-e69bdbaac8.json")
firebase_admin.initialize_app(cred , {"databaseURL":"https://hackathon-f91a0-default-rtdb.firebaseio.com/"})

# creating reference to root node
ref=db.reference("/")

# retrieving data from root node
ref.get("/")

db.reference("/age").set(20)
ref.get("/age")

db.reference("/height").set(21)
ref.get("/height")

db.reference("/weight").set(22)
ref.get("/weight")

db.reference("/").update({"age":20,"height":21,"weight":22})
ref.get("/")