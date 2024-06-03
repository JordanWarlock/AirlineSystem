from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://Jordan:JordanPassword@cluster0.hwxs0tu.mongodb.net/Airline?retryWrites=true&w=majority&appName=Cluster0"
mongo = PyMongo(app)
db = mongo.db
