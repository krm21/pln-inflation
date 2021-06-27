from flask import Flask
from flask import jsonify
from inflation import Inflation

app = Flask(__name__)

def get_data():
    inf = Inflation()
    return inf.get_json()

@app.route("/time")
def hello_world():
    response = jsonify(get_data())
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response

if __name__ == '__main__':
    app.run()