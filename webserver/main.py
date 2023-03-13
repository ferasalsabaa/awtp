from datetime import datetime
from pathlib import Path
import json
import os
import random
from flask import Flask, request, send_from_directory
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

ads_folder = Path('public/ads/')
template_folder = Path('public/ad-templates/')

# Display-Ad Editor posts ads to this route, 
# ads are saved in the ads_folder
@app.route("/ads", methods=['POST'])
def create_ad():
    json_string = json.dumps(request.get_json())
    now = datetime.now()
    json_file_name = str(request.get_json()['generalInfo']['name']) + '_' + str(now.strftime('%d_%m_%Y_%H_%M_%S')) + '.json'
    json_file = open(ads_folder / json_file_name, 'w+')
    json_file.write(json_string)
    json_file.close()
    print(json_file_name)
    print('Success')
    return 'Success'   

# HbbTV App requests ads from this route 
# function picks a random ad and returns a VAST response
@app.route("/ads/random", methods=['GET'])
def get_random_ad():
    print("Request Incoming")
    if request.method == 'GET':
        file_path = str(random.choice(os.listdir(ads_folder)))
        with open(ads_folder / file_path, 'r') as openfile:
            json_object = json.load(openfile)
            print('JSON Object: ', json_object)
        
        vast_object = generate_vast_xml(json_object, file_path)
        return vast_object
    return 'No'

# HbbTV App reads banner JSON from here, URL in VAST response
@app.route('/<filepath>')
def open_json(filepath):
    with open(ads_folder / filepath, 'r') as openfile:
        json_object = json.load(openfile)
    return json_object

# Display-Ad Editor posts banner templates to this route
@app.route("/templates", methods=['POST'])
def create_template():
    json_string = request.get_json()
    json_file_name = json_string['generalInfo']['name'] + '.json'
    json_file = open(template_folder / json_file_name, 'w+')
    json_file.write(json.dumps(json_string))
    json_file.close()
    return 'Success'   

# Display-Ad Editor gets all saved banner templates from here
@app.route("/templates", methods=['GET'])
def get_templates():
    file_paths = [f for f in os.listdir(template_folder) if os.path.isfile(template_folder / f)]
    all_templates = []
    for f in file_paths:
        with open(template_folder / f, 'r') as openfile:
            json_object = json.load(openfile)
        all_templates.append(json_object)
    return all_templates

# function that uses banner JSON to create a VAST XML
def generate_vast_xml(json, filepath):
    file_url = 'http://127.0.0.1:8000/' + filepath
    duration = json['generalInfo']['duration']
    ad_name = filepath.split('_')[0]

    vast_xml =  f'''<VAST version="4.2">
        <Ad id="{ad_name}">
            <InLine>
                <AdTitle>{ad_name}</AdTitle>
                <Creatives>
                    <Creative>
                        <NonLinearAds>
                            <NonLinear>
                                <StaticResource>{file_url}</StaticResource>
                                <Duration>{duration}</Duration>
                            </NonLinear>
                        </NonLinearAds>
                    </Creative>
                </Creatives>
            </InLine>
        </Ad>
    </VAST>
    '''
    return vast_xml


if __name__ == '__main__':
    app.run(debug=True, port=8000)
