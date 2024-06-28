from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://alan:admin123@cluster0.lc37p9a.mongodb.net/"
# Create a new client and connect to the server
db_client = MongoClient(uri, server_api=ServerApi('1'))
# Send a ping to confirm a successful connection

try:
    db_client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)