from datetime import datetime
import json
import os
import random
from flask import Flask, request
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
        # if 'file' not in request.files:
        #     flash('No File part')
        #     return redirect(request.url)
        # json_file = request.files['body']
        # if json_file.filename == '':
        #     flash('No file')
        #     return redirect(request.url)
        # if json_file and allowed_file(json_file.filename):
        # filename = secure_filename(json_file.filename)
        # json_file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        # print(json_file)
        return 'Success'   

@app.route("/get_ad/<minute>", methods=['GET'])
def send_file(minute):
    if request.method == 'GET':
        if minute % 2 == 0:
            file_name = random.choice(os.listdir("public/even/"))
        else:
            file_name = random.choice(os.listdir("public/odd/"))
        return send_file(file_name, mimetype='application/json')
    else:
        return 'Wrong request'

if __name__ == '__main__':
    app.run(debug=True, port=8000)