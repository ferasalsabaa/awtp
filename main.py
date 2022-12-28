from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("tutorials_home.html")

@app.route("/tutorial1")
def tutorial1():
    return render_template("hello-world.html")

@app.route("/tutorial2")
def tutorial2():
    return render_template("rc-interaction.html")

@app.route("/tutorial3")
def tutorial3():
    return render_template("broadcast-object.html")

@app.route("/tutorial4")
def tutorial4():
    return render_template("logger_example.html")