from flask import Flask, render_template, request, jsonify
from translate import get_translation
app = Flask(__name__)

# home page
@app.route("/")
def home_page():
    return render_template("index.html")

# speech to text
@app.route('/speech-to-text')
def speech_to_text():
    return render_template("speech-to-text.html")

# speech translation
@app.route("/speech-translation")
def speech_translation():
    return render_template("speech-translation.html")

# translate text
@app.route('/text-translate', methods=['POST'])
def translate_text():
    data = request.get_json()
    text_input = data['text']
    translation_output = data['to']
    response = get_translation(text_input, translation_output)
    return jsonify(response)
