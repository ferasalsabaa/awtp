import json
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

def load_json():
    f = open("l-banner.json")
    json_data = json.load(f)
    print(json_data)
    print(json_data["width"])
    f.close()
    return json_data

def load_json_ads():
    f = open("ads.json")
    json_data_ads = json.load(f)
    print(json_data_ads)
    f.close()
    return json_data_ads

@app.route("/")
def home():
    return render_template("tutorials_home.html")

@app.route('/ads/<string:name>')
def get_ads(name):
    json_data_ads = load_json_ads()
    for ad in json_data_ads:
        print('+++')
        print(ad['type'])
        if(ad['type']==name):
            return jsonify(ad['type'])
    return jsonify({'message':'Ad not found'})

@app.route('/ad',methods=['POST'])
def create_ad():
    json_data_ads = load_json_ads()
    req_data = request.get_json()
    new_ad={
        'type': req_data['type'],
        'width': req_data['width']
    }
    json_data_ads.append(new_ad)
    return jsonify(new_ad)

@app.route('/ad/<string:type>/<string:width>',methods=['POST'])
def create_ad_item():
    json_data_ads = load_json_ads()
    for ad in json_data_ads:
        if(ad['type']==type):
            req_data = request.get_json()
            new_item = {
                'type':req_data['type'],
                'width':req_data['width']
            }
            json_data_ads['type'].append(new_item)
            return jsonify(new_item)
    return jsonify({'message':'Ad not found'})

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