from datetime import datetime
import json
import os
import random
from flask import Flask, request, send_from_directory
from flask_cors import CORS



app = Flask(__name__)
CORS(app)


@app.route("/upload", methods=['POST'])
def upload_file():
    if request.method == 'POST':
        print(request.get_json())
        json_string = json.dumps(request.get_json())
        now = datetime.now()
        json_file_name = str(now.strftime('%d_%m_%Y_%H_%M_%S')) + '.json'
        minute = int(json_file_name.split("_")[4])
        if minute % 2 == 0:
            json_file = open(f'public/even/{json_file_name}', 'w+')
            json_file.write(json_string)
            json_file.close()
        else:
            json_file = open(f'public/odd/{json_file_name}', 'w+')
            json_file.write(json_string)
            json_file.close()
        print(json_file_name)
        print('Success')
        return 'Success'   

@app.route("/get_ad", methods=['GET'])
def send_file():
    if request.method == 'GET':
        minute_requested = int(request.args.getlist('minute')[0])
        print(request.args.getlist('minute')[0])
        if minute_requested % 2 == 0:
            file_path = str(random.choice(os.listdir("public/even/")))
            with open(f'public/even/{file_path}', 'r') as openfile:
                json_object = json.load(openfile)
            print(file_path)
        else:
            file_path = str(random.choice(os.listdir("public/odd/")))
            with open(f'public/odd/{file_path}', 'r') as openfile:
                json_object = json.load(openfile)
        return json_object
    return 'No'

if __name__ == '__main__':
    app.run(debug=True, port=8000)