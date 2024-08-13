from flask import Flask, jsonify
import json

app = Flask(__name__)

@app.route('/api/getData', methods=['GET'])
def get_buttons():
    with open('button_texts.json') as f:
        button_texts = json.load(f)
    return jsonify(button_texts)

if __name__ == '__main__':
    app.run(debug=True)