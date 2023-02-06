import json
import os
from flask import Flask, flash, request, redirect, send_from_directory, render_template, url_for
from flask_cors import CORS
from werkzeug.utils import secure_filename


UPLOAD_FOLDER = '../public'
ALLOWED_EXTENSIONS = {'json'}

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
CORS(app)

# def allowed_file(filename):
#     return '.' in filename and \
#         filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/upload", methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        print(request.get_json())
        json_string = json.dumps(request.get_json())
        jsonFile = open('public/newFile.json', 'w+')
        jsonFile.write(json_string)
        jsonFile.close()
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

if __name__ == '__main__':
    app.run(debug=True, port=8000)