from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from scrapeFlights import get_oneway_flights,get_return_flights
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

@app.route("/api/flightData/oneway",methods=["POST"])
def getOnewayFlightsData():
    params = request.get_json()
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_oneway_flights(departureCode,destinationCode,departureDate,passengerCount,cabinClass)
    return jsonify(data)


@app.route("/api/signup",methods=["POST"])
def setSignupData():
    params = request.get_json()
    firstName = params.get("firstName")
    lastName = params.get("lastName")
    age =  params.get("age")
    gender =  params.get("gender")
    country =  params.get("country")
    email =  params.get("email")
    password =  params.get("password")
    db.users.insert_one({
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "gender": gender,
        "country": country,
        "email": email,
        "password": password
    })
    return "User Added Successfully"


@app.route("/api/login",methods=["POST"])
def getLoginData():
    params = request.get_json()
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_oneway_flights(departureCode,destinationCode,departureDate,passengerCount,cabinClass)
    return jsonify(data)

@app.route("/api/flightData/return",methods=["POST"])
def getReturnFlightsData():
    params = request.get_json()
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    returnDate = params.get("retDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_return_flights(departureCode,destinationCode,departureDate,returnDate,passengerCount,cabinClass)
    return jsonify(data)


@app.route("/api/currencyRates",methods=["GET"])
def getCurrencyRates():
    results = db.CurrencyRates.find_one({},{"_id": 0, "search_date_time": 1, "rates": 1})
    return jsonify(results)


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