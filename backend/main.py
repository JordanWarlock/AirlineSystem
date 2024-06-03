from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
from controllers.auth_controller import auth_bp
from controllers.booking_controller import booking_bp
from controllers.flight_controller import flight_bp
from controllers.search_controller import search_bp
from controllers.user_controller import user_bp

app = Flask(__name__)
CORS(app)



@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

app.register_blueprint(auth_bp, url_prefix='/api')
app.register_blueprint(booking_bp, url_prefix='/api')
app.register_blueprint(flight_bp, url_prefix='/api')
app.register_blueprint(search_bp, url_prefix='/api')
app.register_blueprint(user_bp, url_prefix='/api/admin')

if __name__ == "__main__":
    app.run(debug=True)
