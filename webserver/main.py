from datetime import datetime
from pathlib import Path
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

@app.route("/get_ad", methods=['GET'])
def send_file():
    if request.method == 'GET':
        minute_requested = int(request.args.getlist('minute')[0])
        print(request.args.getlist('minute')[0])
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

@app.route('/json-to-vast', methods=['POST'])
def json_to_vast():
    json_data = request.get_json()

    vast_xml = create_vast_xml(json_data)

    response = Response(vast_xml, content_type='application/xml')

    return response

def create_vast_xml(json_data):
    width = json_data['generalInfo']["width"]
    type_ad = json_data['generalInfo']["type_ad"]
    link_url = json_data['generalInfo']["link-url"]
    interactivity = json_data['generalInfo']["interactivity"]
    height = json_data['generalInfo']["height"]
    duration = json_data['generalInfo']["duration"]
    background_type = json_data['generalInfo']["background-type"]
    background_color = json_data['generalInfo']["background-color"]

    alignment_left = json_data['generalInfo']["alignment"]["left"]
    alignment_top = json_data['generalInfo']["alignment"]["top"]


    ad_id = json_data['ad_id']
    ad_title = json_data['ad_title']
    ad_description = json_data['ad_description']
    ad_url = json_data['ad_url']
    impression_url = json_data['impression_url']
    clickthrough_url = json_data['clickthrough_url']

    # Create VAST XML document using extracted data
    vast_xml = f'''<VAST version="4.2">
        <Ad id="{ad_id}">
            <InLine>
                <AdSystem>Example Ad System</AdSystem>
                <AdTitle>{ad_title}</AdTitle>
                <Description>{ad_description}</Description>
                <Impression>
                    <URL>{impression_url}</URL>
                </Impression>
                <Creatives>
                    <Creative>
                        <Linear>
                            <VideoClicks>
                                <ClickThrough>{clickthrough_url}</ClickThrough>
                            </VideoClicks>
                        </Linear>
                    </Creative>
                </Creatives>
                <generalInfo>
                    <alignment>
                        <left>{alignment_left}</left>
                        <top>{alignment_top}</top>
                    </alignment>
                    <background-color>{background_color}</background-color>
                    <background-type>{background_type}</background-type>
                    <duration>{duration}</duration>
                    <height>{height}</height>
                    <interactivity>{interactivity}</interactivity>
                    <link-url>{link_url}</link-url>
                    <type>{type_ad}</type>
                    <width>{width}</width>
                </generalInfo>
            </InLine>
        </Ad>
    </VAST>'''
    return vast_xml

if __name__ == '__main__':
    app.run(debug=True, port=8000)