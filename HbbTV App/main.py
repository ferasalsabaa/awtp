import json
from flask import Flask, render_template, request
import socket

app = Flask(__name__)

@app.route("/")
def home():
    print(request.remote_addr)
    return render_template("hbbtv-app.html")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)