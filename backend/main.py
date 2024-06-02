from flask import Flask,request,jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from scrapeFlights import get_oneway_flights,get_return_flights,getFlightStatus
from chatbot.chatbotImplementaion import chatbot_response

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
    print(params)
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_oneway_flights(departureCode,destinationCode,departureDate,passengerCount,cabinClass)
    return jsonify(data)


@app.route("/api/signup", methods=["POST"])
def setSignupData():
    params = request.get_json()
    firstName = params.get("firstName")
    lastName = params.get("lastName")
    age = params.get("age")
    gender = params.get("gender")
    country = params.get("country")
    email = params.get("email")
    password = params.get("password")

    existing_user = db.users.find_one({"email": email})
    if existing_user:
        return "Email already registered", 400  

    
    db.users.insert_one({
        "firstName": firstName,
        "lastName": lastName,
        "age": age,
        "gender": gender,
        "country": country,
        "email": email,
        "password": password
    })
    return "User Added Successfully", 201

@app.route("/api/email", methods=["POST"])
def setEmailData():
    params = request.get_json()
    email = params.get("email")

    existing_user = db.Email.find_one({"email": email})
    if existing_user:
        return "Email already registered", 400  

    
    db.Email.insert_one({
        "email": email,
    })
    return "User Added Successfully", 201

@app.route("/api/login", methods=["POST"])
def login():
    params = request.get_json()
    email = params.get("email")
    password = params.get("password")
    
    user = db.users.find_one({"email": email,"password" : password})
    user['_id'] = str(user['_id'])
    if user:
        return {"message": "Login successful","user":user}, 200
    return {"message": "Invalid email or password"}, 401


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
    conversation_state = data.get("conversation_state")
    ai_response = chatbot_response(humanMessage,conversation_state)
    payload = {
        "type" : "AI",
        "message" : ai_response["response"],
        "conversation_state": ai_response["conversation_state"]
    }

    return jsonify(payload)

@app.route("/api/flighstatus", methods=["POST"])
def getStatus():
    data= request.get_json()
    print (data)
    flightNumber = data.get("flightNumber")
    carrierCode = data.get("carrierCode")
    departureDate = data.get("departureDate")
    response = getFlightStatus(carrierCode,flightNumber,departureDate)
    return response

# Admin Console Endpoints

@app.route("/api/admin/searchUser", methods=["POST"])
def searchUser():
    data = request.get_json()
    search_value = data.get("search_value")
    results = db.users.find(
    {
        "$or": [
            {"_id": search_value},
            {"firstName": {"$regex": search_value, "$options": "i"}},
            {"lastName": {"$regex": search_value, "$options": "i"}}
        ]
    })
    users = list(results)
    for user in users: 
        user['_id'] = str(user['_id'])
    
    return jsonify(users)

@app.route("/api/admin/updateUser", methods=["PUT"])
def updateUser():
    data = request.get_json()
    user_id = data.get("userId")
    update_data = {k: v for k, v in data.items() if k != "userId"}
    db.users.update_one({"_id": user_id}, {"$set": update_data})
    return "User Updated Successfully", 200

@app.route("/api/admin/deleteUser", methods=["DELETE"])
def deleteUser():
    data = request.get_json()
    user_id = data.get("userId")
    db.users.delete_one({"_id": user_id})
    return "User Deleted Successfully", 200

@app.route("/api/admin/updateFlightStatus", methods=["PUT"])
def updateFlightStatus():
    data = request.get_json()
    user_id = data.get("userId")
    new_status = data.get("flightStatus")
    db.users.update_one({"_id": user_id}, {"$set": {"flightStatus": new_status}})
    return "Flight Status Updated Successfully", 200

@app.route("/api/topCities", methods=["GET"])
def getTopCities():
    top_cities = [
        {"name": "Islamabad", "code": "ISB", "imageUrl": "https://as1.ftcdn.net/v2/jpg/03/84/72/34/1000_F_384723442_NwXSiqY7ttZNaxGdE5RfGlWYg3cUqhE3.jpg"},
        {"name": "Dubai", "code": "DXB", "imageUrl": "path_to_dubai_image"},
        {"name": "Jeddah", "code": "JED", "imageUrl": "path_to_jeddah_image"},
        # Add more cities as needed
    ]
    return jsonify(top_cities)

app.run(debug=True)