from sklearn.preprocessing import LabelEncoder
from sklearn.decomposition import PCA
from utils_nans1 import *
import pandas as pd
import math

global model
global features

def print_LINE(features, labels, p_value_thresh = 0.05):
    global model

    x_with_const = sm.add_constant(features)
    is_linearity_found, p_value = linear_assumption(model, x_with_const, labels, plot=False)
    autocorrelation, dw_value = independence_of_errors_assumption(model, x_with_const, labels, plot=False)
    n_dist_type, p_value = normality_of_errors_assumption(model, x_with_const, labels, plot=False)
    e_dist_type, p_value = equal_variance_assumption(model, x_with_const, labels, plot=False)
    has_perfect_collinearity = perfect_collinearity_assumption(features, plot=False)

    print("***************************************************************")
    print("Linearity: ",is_linearity_found)
    print("Independance of errors: ", autocorrelation is None)
    print("Normality of errors: ",n_dist_type == 'normal')
    print("Equal variencce: ",e_dist_type)

    print("Perfect colinarity: ", has_perfect_collinearity)

def transform_predicted(value):
    return "shouldnt win" if value <= 0.5 else "should win"

def transform_success(predicted, actual):
    return "yes" if predicted == "should win" and actual == 1 or predicted == "shouldnt win" and actual == 0 else "no"

def transform_residuals(data_errors):
    data_errors['Succesful'] = data_errors['Predicted'].apply(transform_predicted)
    data_errors['Guessed right'] = data_errors.apply(lambda row: transform_success(row['Succesful'], row['Actual']), axis=1)
    return data_errors

def predict_winner(selected_movies):
    global model
    list_results = []
    winning_score = -math.inf
    test_data = pd.read_csv("static/files/2024_candidates.csv")
    original_data = pd.read_csv("static/files/oscardata.csv")
    for film in selected_movies:
        single_film = test_data[test_data['Film'] == film]

        if single_film.empty:
            single_film = original_data[original_data['Film'] == film]
        single_film = single_film.drop(['Film', 'Year', 'won_best_picture'], axis=1)

        single_film = np.column_stack([np.ones(len(single_film)), single_film])

        results = model.predict(single_film)
        
        if results[0] > winning_score:
            winning_score = results[0]
        list_results.append([film, results[0]])


    for film in list_results:
        if film[1] == winning_score:
            return film[0]     #return name
        

def print_model_stats(features, labels):
    global model

    print(get_rsquared_adj(model, features, labels))
    print_LINE(features, labels)
    print(are_assumptions_satisfied(model, features, labels, 0.02))

    data_errors = calculate_residuals(model, features, labels)
    data_errors = transform_residuals(data_errors)
    print(data_errors)
    print(model.summary())

def make_model(print_stats = False):
    global model
    global features

    data = pd.read_csv('static\\files\\oscardata.csv')
    features = data.drop(['Film', 'Year', 'won_best_picture'], axis=1)  

    labels = data['won_best_picture']

    model = get_fitted_model(features, labels)

    if print_stats:
        print_model_stats(features, labels)
    
