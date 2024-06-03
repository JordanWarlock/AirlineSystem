from flask import Blueprint, request, jsonify
from bson import ObjectId
from models.user_model import db

user_bp = Blueprint('user', __name__)

@user_bp.route("/searchUser", methods=["POST"])
def searchUser():
    data = request.get_json()
    search_value = data.get("search_value")
    results = db.users.find(
        {
            "$or": [
                {"_id": search_value},
                {"userName": {"$regex": search_value, "$options": "i"}},
            ]
        }
    )
    users = list(results)
    for user in users:
        user['_id'] = str(user['_id'])

    return jsonify(users)

@user_bp.route("/updateUser", methods=["PUT"])
def updateUser():
    data = request.get_json()
    user_id = data.get("user_id")
    update_fields = {k: v for k, v in data.items() if k != "user_id"}

    if not user_id or not update_fields:
        return jsonify({"error": "Invalid request"}), 400

    result = db.users.update_one({"_id": ObjectId(user_id)}, {"$set": update_fields})

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"success": True})

@user_bp.route("/deleteUser", methods=["DELETE"])
def deleteUser():
    data = request.get_json()
    user_id = data.get("user_id")

    if not user_id:
        return jsonify({"error": "Invalid request"}), 400

    result = db.users.delete_one({"_id": ObjectId(user_id)})

    if result.deleted_count == 0:
        return jsonify({"error": "User not found"}), 404

    return jsonify({"success": True})

@user_bp.route("/updateFlightStatus", methods=["PUT"])
def updateFlightStatus():
    data = request.get_json()
    user_id = data.get("userId")
    new_status = data.get("flightStatus")
    db.users.update_one({"_id": ObjectId(user_id)}, {"$set": {"flightStatus": new_status}})
    return "Flight Status Updated Successfully", 200
