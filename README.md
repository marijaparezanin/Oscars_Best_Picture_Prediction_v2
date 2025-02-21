# Oscar Best Picture Predictor

## Overview

This project is a web application that predicts the winner of the Oscar Best Picture award using linear regression. The prediction is based on features extracted from historical data of Oscar-nominated movies over the past 20 years. The web application is built using Flask, HTML, JavaScript, and CSS.

## Features

- **Prediction Model:** The core of the application is a linear regression model trained on historical data. The model considers various features of movies and predicts the likelihood of winning the Best Picture award.

- **Web Interface:** The frontend provides a user-friendly interface where users can select three movies from the list of 2024 Oscar Best Picture candidates. You can also click the "Try new feature" text to reveal 60 more films that you can use as candidates. The selected movies are then sent to the backend for prediction.

- **Model Evaluation:** The application evaluates the trained model by checking assumptions such as linearity, independence of errors, normality of errors, and equal variance.

## How to Use

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/marijaparezanin/Oscars_Best_Picture_Prediction_v2.git
   ```

2. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Run the Application:**
   ```bash
   python oscar_web_app.py
   ```
   Open your web browser and go to [http://localhost:5000/](http://localhost:5000/) to access the application.

4. **Select Movies:**
   - On the homepage, you will see a list of 2024 Oscar Best Picture candidates.
   - Choose three movies by clicking on them.

5. **View Prediction:**
   - After selecting three movies, click on the "Predict" button.
   - The application will display the predicted winner along with relevant information.

6. **Explore Further:**
   - You can extend the list and choose three films from all 60 historical movies by modifying the code.

## Project Structure

- **`oscar_web_app.py`:** The main Flask application file containing routes and server configurations.
- **`linear_model.py`:** Python module used to create the linear model.
- **`utils_nans1.py`:** Python module with functions related to the linear regression model and model evaluation.
- **`static/`:** Contains static files such as CSS and JavaScript for the frontend. Data, fonts, posters etc.
- **`templates/`:** HTML templates used by Flask for rendering web pages.

## Requirements

- Python 3.x
- Flask
- NumPy
- Pandas
- Statsmodels
- Seaborn
- Matplotlib
