from flask import Blueprint, request, jsonify
from bson import ObjectId
from models.user_model import db

booking_bp = Blueprint('booking', __name__)

@booking_bp.route("/bookings", methods=["POST", "GET"])
def getBookings():
    if request.method == "POST":
        params = request.get_json()
        existing_booking = db.bookings.find_one({"user": params.get("user"), "flight": params.get("flight"), "price": params.get("price")})
        if existing_booking or params == {}:
            return "Booking failed", 400
        db.bookings.insert_one(params)
        return "Booking Added Successfully", 201

    elif request.method == "GET":
        bookings = list(db.bookings.find({}))
        for booking in bookings:
            booking['_id'] = str(booking['_id'])
        return jsonify(bookings)

@booking_bp.route("/bookings/getUserBookings", methods=["POST"])
def getUserBookings():
    params = request.get_json()
    userId = str(params.get("userInfo"))
    bookings = list(db.bookings.find({"user": userId}).sort("bookingDateTime", -1))
    for booking in bookings:
        booking['_id'] = str(booking['_id'])
    return jsonify(bookings)

@booking_bp.route("/updateBookingStatus", methods=["PUT"])
def updateBookingStatus():
    data = request.get_json()
    bookId = data.get("bookId")
    new_status = data.get("newStatus")

    if not bookId or not new_status:
        return jsonify({"error": "Invalid data"}), 400

    try:
        result = db.bookings.update_one(
            {"_id": ObjectId(bookId)},
            {"$set": {"status": new_status}}
        )

        if result.matched_count == 0:
            return jsonify({"error": "Booking not found"}), 404

        return jsonify({"message": "Booking Status Updated Successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
