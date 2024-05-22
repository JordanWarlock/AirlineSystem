from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from scrapeFlights import get_oneway_flights
from chatbot import generateAIResponse

app = Flask(__name__)
CORS(app)

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

@app.route("/api/flightData",methods=["POST"])
def getData():
    params = request.get_json()
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_oneway_flights(departureCode,destinationCode,departureDate,passengerCount,cabinClass)
    return jsonify(data)


@app.route("/api/generateResponse", methods=["POST"])
def getResponse():
    data = request.get_json()
    humanMessage = data.get("message")
    ai_response = generateAIResponse(humanMessage)
    payload = {
        "type" : "AI",
        "message" : ai_response
    }

    return jsonify(payload)


app.run(debug=True)