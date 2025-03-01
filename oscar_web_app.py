from flask import Flask, render_template, request, jsonify, url_for
from flask_cors import CORS
from linear_model import *
import os

app = Flask(__name__)

CORS(app, resources={r"/predict": {"origins": "https://marijaparezanin.github.io"}})

@app.route('/')
def index():
    # Render the main HTML template
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    make_model()
    selected_movies = request.get_json().get('selected_movies', [])
    print(selected_movies)


    winner = run_prediction(selected_movies)
    print("WINNER: ", winner)

    image_path = url_for('static', filename=f'posters/{winner}.jpg')
    return jsonify({"show_popup": True, "winner": winner, "image_path": image_path})

    #return jsonify({"message": winner})
def run_prediction(selected_movies):
    print(f"Selected movies: {selected_movies}")
    return predict_winner(selected_movies)

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000)) 
    app.run(host="0.0.0.0", port=port)
    #app.run(debug=True)