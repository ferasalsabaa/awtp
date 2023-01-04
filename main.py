import json
from flask import Flask, render_template

app = Flask(__name__)

def load_json():
    f = open("da_video.json")
    json_data = json.load(f)
    print(json_data)
    print(json_data["width"])
    f.close()
    return json_data

@app.route("/")
def home():
    return render_template("tutorials_home.html")

@app.route("/tutorial1")
def tutorial1():
    return render_template("hello-world.html")

@app.route("/tutorial2")
def tutorial2():
    json_data = load_json()
    return render_template("rc-interaction.html", json_file = json_data)

@app.route("/tutorial3")
def tutorial3():
    return render_template("broadcast-object.html")