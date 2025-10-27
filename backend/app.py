from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/submit', methods=['POST'])
def submit():
    data = request.form.to_dict() or request.get_json() or {}
    name = data.get('name')
    message = data.get('message')
    return jsonify({
        'status': 'success',
        'received': {'name': name, 'message': message},
        'note': 'Processed by Flask backend'
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
