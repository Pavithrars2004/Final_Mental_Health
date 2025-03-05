from flask import Flask, request, jsonify
import google.generativeai as genai
from PIL import Image
import io
import base64
import json
import os
from flask_cors import CORS


'''
mental health
analyze_journal
analyze_mental_health
suggest_exercises

fitness plan
generate_plan --nutrition
recognize_food --nutrition
generate_coach_plan -- workout
'''
# Initialize the Flask app
app = Flask(__name__)
CORS(app, origin = "*")

# Configure the Generative AI API
genai.configure(api_key=os.environ.get("API"))

# Function to process the diet plan request

def process_diet_plan(input_text):
    try:
        # Choose a Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create a prompt
        prompt = f"generate personalized diet and nutrition plans, use the combination of biometric data, medical history and dietary preferences to create adaptive meal plans and Indian food recipe names for all seven days in a week Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {str(input_text)}"
        
        response = model.generate_content([prompt])
        
        # Parse the response text to a JSON object
        result_json = json.loads(response.text.strip('```json\n'))
        
        return result_json
    
    except Exception as e:
        return {"error": str(e)}

# Function to process the fitness plan request
#* not working properly
def process_fitness_plan(input_text):
    try:
        # Choose a Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create a prompt
        prompt = f" now act as a fitness coach and suggest exercises daywise for all seven days of the week based on the biometrics and fitness goals given. Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {str(input_text)}"
        
        response = model.generate_content([prompt])
        # Parse the response text to a JSON object
        result_json = json.loads(response.text.strip('```json\n'))
        
        return result_json
    except Exception as e:
        return {"error": str(e)}

# Function to process the text input for mental health assessment
def process_mental_health(input_text):
    try:
        # Choose a Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create a prompt
        prompt = f"Analyze the following text to derive a mental health assessment. Identify potential mental health conditions and suggest appropriate interventions and treatments Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {input_text}"
        
        response = model.generate_content([prompt])
        
        # Parse the response text to a JSON object
        result_json = json.loads(response.text.strip('```json\n'))
        
        return result_json
    
    except Exception as e:
        return {"error": str(e)}

# Function to process the journal text for sentiment analysis
def process_journal(input_text):
    try:
        # Choose a Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create a prompt
        prompt = f"Analyze the following journal and analyze the sentiment, mood shifts, emotional triggers over time Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {input_text}"
        
        response = model.generate_content([prompt])
        
        # Parse the response text to a JSON object
        result_json = json.loads(response.text.strip('```json\n'))
        
        return result_json
    
    except Exception as e:
        return {"error": str(e)}

# Function to suggest CBT exercises, guided meditations, or breathing exercises
def process_cbt_exercises(input_text):
    try:
        # Choose a Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create a prompt
        prompt = f"Analyze the following data and suggest some cognitive behavioural therapy exercises, guided meditations, or breathing exercises Provide the output as a properly formatted JSON object without any additional text or explanations. Ensure all values are valid JSON (e.g., use strings for ranges like '8-12'). Here is the input data: {input_text}"
        
        response = model.generate_content([prompt])
        
        # Parse the response text to a JSON object
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
        return jsonify(result)
    else:
        return jsonify({'error': 'No biometrics provided'}), 400

# Endpoint to receive POST requests for generating diet plan
@app.route('/generate_plan', methods=['POST'])
def generate_plan():
    data = request.get_json()
    if 'biometric_data' in data:
        input_text = json.dumps(data['biometric_data'])
        result = process_diet_plan(input_text)        
        return jsonify(result)
    else:
        return jsonify({'error': 'No biometric_data provided'}), 400

# Endpoint to receive POST requests for food recognition
@app.route('/food-recognition', methods=['POST'])
def recognize_food():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    uploaded_file = request.files['file']
    try:
        # Read the image file
        image = Image.open(uploaded_file)
        
        # Convert the image to bytes
        buf = io.BytesIO()
        image.save(buf, format="JPEG")
        img_bytes = buf.getvalue()

        # Choose a Gemini model
        model = genai.GenerativeModel(model_name="gemini-1.5-pro")
        
        # Create a prompt for food recognition
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
        
        # Extract the internal JSON string from the response
        internal_json_string = response.text.strip('```json\n')
        
        # Parse the string response to a JSON object
        result_json = json.loads(internal_json_string)
        
        return jsonify(result_json)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to receive POST requests for mental health assessment
@app.route('/analyze_mental_health', methods=['POST'])
def analyze_mental_health():
    data = request.get_json()
    if 'text' in data:
        input_text = data['text']
        result = process_mental_health(input_text)
        return jsonify(result)
    else:
        return jsonify({"error": "No text provided"}), 400

# Endpoint to receive POST requests for journal sentiment analysis
@app.route('/analyze_journal', methods=['POST'])
def analyze_journal():
    data = request.get_json()
    if 'text' not in data:
        return jsonify({"error": "No text provided"}), 400
    
    input_text = data['text']
    
    # Process the journal text
    result = process_journal(input_text)
    
    # Return the result as a JSON response
    return jsonify(result)

# Endpoint to receive POST requests for CBT exercises, guided meditations, or breathing exercises
@app.route('/suggest_exercises', methods=['POST'])
def suggest_exercises():
    data = request.get_json()
    if 'data' not in data:
        return jsonify({"error": "No data provided"}), 400
    
    input_text = json.dumps(data['data'])
    
    # Process the input data
    result = process_cbt_exercises(input_text)
    
    # Return the result as a JSON response
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)