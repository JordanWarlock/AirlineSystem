from flask import Blueprint, request, jsonify
from bson import ObjectId
from models.user_model import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route("/signup", methods=["POST"])
def setSignupData():
    params = request.get_json()
    userName = params.get("userName")
    age = params.get("age")
    email = params.get("email")
    password = params.get("password")

    existing_user = db.users.find_one({"email": email})
    if existing_user:
        return "Email already registered", 400

    db.users.insert_one({
        "userName": userName,
        "age": age,
        "email": email,
        "password": password
    })
    return "User Added Successfully", 201

@auth_bp.route("/login", methods=["POST"])
def login():
    params = request.get_json()
    email = params.get("email")
    password = params.get("password")

    user = db.users.find_one({"email": email, "password": password})
    if user:
        user['_id'] = str(user['_id'])
        return {"message": "Login successful", "user": user}, 200
    return {"message": "Invalid email or password"}, 401


@auth_bp.route("/admin/login", methods=["POST"])
def adminLogin():
    params = request.get_json()
    email = params.get("email")
    password = params.get("password")

    user = db.admins.find_one({"email": email, "password": password})
    if user:
        user['_id'] = str(user['_id'])
        return {"message": "Login successful", "user": user}, 200
    return {"message": "Invalid email or password"}, 401
