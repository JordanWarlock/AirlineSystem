from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from scrapeFlights import onewayScrape


app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "667c685dfd85c3cefead9b1a4aa8dda591891daf"
app.config["MONGO_URI"] = "mongodb+srv://Jordan:JordanPassword@cluster0.hwxs0tu.mongodb.net/Airline?retryWrites=true&w=majority&appName=Cluster0"
db = PyMongo(app).db

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/api/search", methods=["POST"])
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
).sort("name", 1).limit(5)
    similar_results = list(results)
    return jsonify(similar_results)

@app.route("/api/flightData")
def getData():
    data = onewayScrape('ISB','JED','2024-05-14')
    return jsonify(data)

app.run(debug=True)