import json
from flask import Flask, render_template

app = Flask(__name__)

def load_json():
    f = open("l-banner.json")
    json_data = json.load(f)
    f.close()
    return json_data

@app.route("/")
def home():
    json_data = load_json()
    return render_template("hbbtv-app.html", json_file = json_data)

if __name__ == '__main__':
    app.run(debug=True)