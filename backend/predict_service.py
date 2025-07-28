from flask import Flask, request, jsonify
from sklearn.linear_model import LinearRegression
import numpy as np

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    past_revenue = data.get('pastRevenue', [])

    if not past_revenue or len(past_revenue) < 2:
        return jsonify({'error': 'pastRevenue must be an array with at least 2 values.'}), 400

    # Prepare data for linear regression
    X = np.array(range(len(past_revenue))).reshape(-1, 1)  # months as features
    y = np.array(past_revenue)  # revenue as target

    model = LinearRegression()
    model.fit(X, y)

    # Predict next 6 months
    future_X = np.array(range(len(past_revenue), len(past_revenue) + 6)).reshape(-1, 1)
    predictions = model.predict(future_X)

    # Round and convert to list for JSON
    predictions = [round(float(p)) for p in predictions]

    return jsonify({'prediction': predictions})

if __name__ == '__main__':
    app.run(port=5001)
