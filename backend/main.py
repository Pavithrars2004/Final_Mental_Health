from flask import Flask, request, jsonify
import google.generativeai as genai
from PIL import Image
import io
import base64
import json
import os
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize the Flask app
app = Flask(__name__)
CORS(app, origin="*")

# Initialize Firebase
cred = credentials.Certificate('hackathon-f91a0-firebase-adminsdk-fbsvc-e69bdbaac8.json')
default_app = firebase_admin.initialize_app(cred)
db = firestore.client()

# Configure the Generative AI API
genai.configure(api_key=os.environ.get("API"))

# Function to store data in Firebase
def store_data(collection_name, data):
    try:
        # Add a new document with an auto-generated ID
        db.collection(collection_name).add(data)
        return True, "Data stored successfully"
    except Exception as e:
        print(f"Error storing data: {e}")
        return False, str(e)

# Function to retrieve data from Firebase
def retrieve_data(collection_name):
    try:
        # Retrieve all documents from the collection
        docs = db.collection(collection_name).stream()
        data = [doc.to_dict() for doc in docs]
        return True, data
    except Exception as e:
        print(f"Error retrieving data: {e}")
        return False, str(e)

# Function to process the diet plan request
def process_diet_plan(input_text):
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = f"generate personalized diet and nutrition plans, use the combination of biometric data, medical history and dietary preferences to create adaptive meal plans and Indian food recipe names for all seven days in a week Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {str(input_text)}"
        response = model.generate_content([prompt])
        result_json = json.loads(response.text.strip('```json\n'))
        return result_json
    except Exception as e:
        return {"error": str(e)}

# Function to process the fitness plan request
def process_fitness_plan(input_text):
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = f" now act as a fitness coach and suggest exercises daywise for all seven days of the week based on the biometrics and fitness goals given. Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {str(input_text)}"
        response = model.generate_content([prompt])
        result_json = json.loads(response.text.strip('```json\n'))
        return result_json
    except Exception as e:
        return {"error": str(e)}

# Function to process the text input for mental health assessment
def process_mental_health(input_text):
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = f"Analyze the following text to derive a mental health assessment. Identify potential mental health conditions and suggest appropriate interventions and treatments Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {input_text}"
        response = model.generate_content([prompt])
        result_json = json.loads(response.text.strip('```json\n'))
        return result_json
    except Exception as e:
        return {"error": str(e)}

# Function to process the journal text for sentiment analysis
def process_journal(input_text):
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = f"Analyze the following journal and analyze the sentiment, mood shifts, emotional triggers over time Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {input_text}"
        response = model.generate_content([prompt])
        result_json = json.loads(response.text.strip('```json\n'))
        return result_json
    except Exception as e:
        return {"error": str(e)}

# Function to suggest CBT exercises, guided meditations, or breathing exercises
def process_cbt_exercises(input_text):
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = f"Analyze the following data and suggest some cognitive behavioural therapy exercises, guided meditations, or breathing exercises Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {input_text}"
        response = model.generate_content([prompt])
        result_json = json.loads(response.text.strip('```json\n'))
        return result_json
    except Exception as e:
        return {"error": str(e)}

# Endpoint to receive POST requests for generating fitness plan
@app.route('/generate_coach_plan', methods=['POST'])
def generate_coach_plan():
    data = request.get_json()
    if 'biometrics' in data:
        input_text = json.dumps(data['biometrics'])
        result = process_fitness_plan(input_text)
        if 'error' not in result:
            success, message = store_data('fitness_plans', result)
            if success:
                return jsonify({"message": message, "data": result})
            else:
                return jsonify({"error": message}), 500
        else:
            return jsonify(result), 400
    else:
        return jsonify({'error': 'No biometrics provided'}), 400

# Endpoint to receive POST requests for generating diet plan
@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    data = request.get_json()
    if 'biometric_data' in data:
        input_text = json.dumps(data['biometric_data'])
        result = process_diet_plan(input_text)
        if 'error' not in result:
            success, message = store_data('diet_plans', result)
            if success:
                return jsonify({"message": message, "data": result})
            else:
                return jsonify({"error": message}), 500
        else:
            return jsonify(result), 400
    else:
        return jsonify({'error': 'No biometric_data provided'}), 400

# Endpoint to receive POST requests for food recognition
@app.route('/food-recognition', methods=['POST'])
def recognize_food():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    uploaded_file = request.files['file']
    try:
        image = Image.open(uploaded_file)
        buf = io.BytesIO()
        image.save(buf, format="JPEG")
        img_bytes = buf.getvalue()

        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        prompt = "Recognize the food item in the picture and provide its nutrient values provide the output in JSON format easy to parse as javascript object no text output."
        response = model.generate_content(
            [
                {
                    "mime_type": "image/jpeg",
                    "data": base64.b64encode(img_bytes).decode("utf-8"),
                },
                prompt,
            ]
        )
        internal_json_string = response.text.strip('```json\n')
        result_json = json.loads(internal_json_string)
        success, message = store_data('food_recognition', result_json)
        if success:
            return jsonify({"message": message, "data": result_json})
        else:
            return jsonify({"error": message}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to receive POST requests for mental health assessment
@app.route('/analyze_mental_health', methods=['POST'])
def analyze_mental_health():
    data = request.get_json()
    if 'text' in data:
        input_text = data['text']
        result = process_mental_health(input_text)
        if 'error' not in result:
            success, message = store_data('mental_health_assessments', result)
            if success:
                return jsonify({"message": message, "data": result})
            else:
                return jsonify({"error": message}), 500
        else:
            return jsonify(result), 400
    else:
        return jsonify({"error": "No text provided"}), 400

# Endpoint to receive POST requests for journal sentiment analysis
@app.route('/analyze_journal', methods=['POST'])
def analyze_journal():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    input_text = data['text']
    result = process_journal(input_text)
    if 'error' not in result:
        success, message = store_data('journal_analyses', result)
        if success:
            return jsonify({"message": message, "data": result})
        else:
            return jsonify({"error": message}), 500
    else:
        return jsonify(result), 400

# Endpoint to receive POST requests for CBT exercises, guided meditations, or breathing exercises
@app.route('/suggest_exercises', methods=['POST'])
def suggest_exercises():
    data = request.get_json()
    if 'data' not in data:
        return jsonify({"error": "No data provided"}), 400
    input_text = json.dumps(data['data'])
    result = process_cbt_exercises(input_text)
    if 'error' not in result:
        success, message = store_data('cbt_exercises', result)
        if success:
            return jsonify({"message": message, "data": result})
        else:
            return jsonify({"error": message}), 500
    else:
        return jsonify(result), 400

# Endpoint to retrieve fitness plan
@app.route('/retrieve_fitness_plan', methods=['GET'])
def retrieve_fitness_plan():
    success, data = retrieve_data('fitness_plans')
    if success:
        return jsonify(data)
    else:
        return jsonify({"error": data}), 500

# Endpoint to retrieve diet plan
@app.route('/retrieve_diet_plan', methods=['GET'])
def retrieve_diet_plan():
    success, data = retrieve_data('diet_plans')
    if success:
        return jsonify(data)
    else:
        return jsonify({"error": data}), 500

# Endpoint to retrieve mental health assessment
@app.route('/retrieve_mental_health_assessment', methods=['GET'])
def retrieve_mental_health_assessment():
    success, data = retrieve_data('mental_health_assessments')
    if success:
        return jsonify(data)
    else:
        return jsonify({"error": data}), 500

# Endpoint to retrieve journal analysis
@app.route('/retrieve_journal_analysis', methods=['GET'])
def retrieve_journal_analysis():
    success, data = retrieve_data('journal_analyses')
    if success:
        return jsonify(data)
    else:
        return jsonify({"error": data}), 500

# Endpoint to retrieve CBT exercises
@app.route('/retrieve_cbt_exercises', methods=['GET'])
def retrieve_cbt_exercises():
    success, data = retrieve_data('cbt_exercises')
    if success:
        return jsonify(data)
    else:
        return jsonify({"error": data}), 500

if __name__ == '__main__':
    app.run(debug=True)