from flask import Flask, render_template, request, jsonify, url_for
from flask_cors import CORS
from linear_model import *
import os

app = Flask(__name__)

CORS(app, resources={r"/predict": {"origins": "https://marijaparezanin.github.io"}})


@app.before_request
def before_request():
    # Manually handle preflight OPTIONS requests
    if request.method == 'OPTIONS':
        response = app.make_response('')
        response.headers['Access-Control-Allow-Origin'] = 'https://marijaparezanin.github.io'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        return response

@app.route('/')
def index():
    # Render the main HTML template
    make_model()

@app.route('/predict', methods=['POST'])
def predict():
    selected_movies = request.get_json().get('selected_movies', [])
    print(selected_movies)

    winner = run_prediction(selected_movies)
    print("WINNER: ", winner)

    return jsonify({"show_popup": True, "winner": winner})

def run_prediction(selected_movies):
    print(f"Selected movies: {selected_movies}")
    return predict_winner(selected_movies)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000)) 
    app.run(host="0.0.0.0", port=port)
    #app.run(debug=True)