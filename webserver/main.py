from datetime import datetime
from pathlib import Path
import json
import os
import random
from flask import Flask, request, send_from_directory
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

@app.route("/ads", methods=['POST'])
def create_ad():
    print(request.get_json())
    json_string = json.dumps(request.get_json())
    now = datetime.now()
    json_file_name = str(now.strftime('%d_%m_%Y_%H_%M_%S')) + '.json'
    minute = int(json_file_name.split("_")[4])
    if minute % 2 == 0:
        files_folder = Path('public/even/')
        json_file = open(files_folder / json_file_name, 'w+')
        json_file.write(json_string)
        json_file.close()
    else:
        files_folder = Path('public/odd/')
        json_file = open(files_folder / json_file_name, 'w+')
        json_file.write(json_string)
        json_file.close()
    print(json_file_name)
    print('Success')
    return 'Success'   

@app.route("/ads/random", methods=['GET'])
def get_random_ad():
    if request.method == 'GET':
        if len(request.args.getlist('minute')):
            minute_requested = int(request.args.getlist('minute')[0])
        else:
            minute_requested = 0
        if minute_requested % 2 == 0:
            files_folder = Path('public/even/')
            file_path = str(random.choice(os.listdir(files_folder)))
            with open(files_folder / file_path, 'r') as openfile:
                json_object = json.load(openfile)
            print(file_path)
        else:
            files_folder = Path('public/odd/')
            file_path = str(random.choice(os.listdir(files_folder)))
            with open(files_folder / file_path, 'r') as openfile:
                json_object = json.load(openfile)
        return json_object
    return 'No'

@app.route("/templates", methods=['POST'])
def create_template():
    print(request.get_json())
    json_string = request.get_json()
    json_file_name = json_string['generalInfo']['name'] + '.json'
    print(json_file_name)
    files_folder = Path('public/ad-templates/')
    json_file = open(files_folder / json_file_name, 'w+')
    json_file.write(json.dumps(json_string))
    json_file.close()
    return 'Success'   

@app.route("/templates", methods=['GET'])
def get_templates():
    files_folder = Path('public/ad-templates/')
    file_paths = [f for f in os.listdir(files_folder) if os.path.isfile(files_folder / f)]
    all_templates = []
    for f in file_paths:
        with open(files_folder / f, 'r') as openfile:
            json_object = json.load(openfile)
        all_templates.append(json_object)
    return all_templates

if __name__ == '__main__':
    app.run(debug=True, port=8000)