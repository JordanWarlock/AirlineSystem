from flask import Blueprint, request, jsonify
from scrapeFlights import get_oneway_flights, get_return_flights, getFlightStatus

flight_bp = Blueprint('flight', __name__)

@flight_bp.route("/flightData/oneway", methods=["POST"])
def getOnewayFlightsData():
    params = request.get_json()
    print(params)
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_oneway_flights(departureCode, destinationCode, departureDate, passengerCount, cabinClass)
    return jsonify(data)

@flight_bp.route("/flightData/return", methods=["POST"])
def getReturnFlightsData():
    params = request.get_json()
    departureCode = params.get("departureCode")
    destinationCode = params.get("destinationCode")
    departureDate = params.get("depDate")
    returnDate = params.get("retDate")
    passengerCount = params.get("passengerCount")
    cabinClass = params.get("cabinClass")

    data = get_return_flights(departureCode, destinationCode, departureDate, returnDate, passengerCount, cabinClass)
    return jsonify(data)

@flight_bp.route("/flighstatus", methods=["POST"])
def getStatus():
    data = request.get_json()
    print(data)
    flightNumber = data.get("flightNumber")
    carrierCode = data.get("carrierCode")
    departureDate = data.get("departureDate")
    response = getFlightStatus(carrierCode, flightNumber, departureDate)
    return response
