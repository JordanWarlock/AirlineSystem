from flask import Blueprint, request, jsonify
from models.user_model import db
from chatbot.chatbotImplementaion import chatbot_response
search_bp = Blueprint('search', __name__)

@search_bp.route("/search", methods=["POST"])
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

@search_bp.route("/currencyRates", methods=["GET"])
def getCurrencyRates():
    results = db.CurrencyRates.find_one({}, {"_id": 0, "search_date_time": 1, "rates": 1})
    return jsonify(results)

@search_bp.route("/generateResponse", methods=["POST"])
def getResponse():
    data = request.get_json()
    humanMessage = data.get("message")
    conversation_state = data.get("conversation_state")
    ai_response = chatbot_response(humanMessage, conversation_state)
    payload = {
        "type": "AI",
        "message": ai_response["response"],
        "conversation_state": ai_response["conversation_state"]
    }

    return jsonify(payload)
