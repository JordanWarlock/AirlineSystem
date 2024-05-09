from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
app.config["MONGO_URI"] = "mongodb://localhost:27017/Airline"
db = PyMongo(app).db

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    search_value = data.get("search_value")
    results = db.airports.find(
    {
        "$or": [
            {"city": {"$regex": search_value, "$options": "i"}},
            {"country": {"$regex": search_value, "$options": "i"}},
            {"name": {"$regex": search_value, "$options": "i"}}
        ]
    },
    {"_id": 0, "name": 1, "code": 1}
).sort("name", 1)
    similar_results = list(results)
    return jsonify(similar_results)

app.run(debug=True)