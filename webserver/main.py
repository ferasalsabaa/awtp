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
        print (json_object)
        vast_xml = create_vast_xml(json_object)
        print (vast_xml)
        return json_object
    return 'No'

@app.route('/json-to-vast', methods=['POST'])
def json_to_vast():
    json_data = request.get_json()

    vast_xml = create_vast_xml(json_data)

    response = Response(vast_xml, content_type='application/xml')

    return response

def create_vast_xml(json_data):
    general_info = json_data['generalInfo']
    elements = json_data['elements']

    type_ad = general_info['type']
    background_color = general_info['background-color']
    link_url = general_info['link-url']
    coop_shops = general_info['coop-shops']
    promo_code = general_info['promo-code']
    duration = general_info['duration']

    element = elements['element0']
    type_elemnt = element['type']
    content = element['content']
    font_size = element['font-size']
    color = element['color']
    text_decoration = element['text_decoration']
    font_weight = element['font-weight']
    text_align = element['text-align']
    coordinates = element['coordinates']
    coordinates_top = coordinates['top']
    coordinates_left = coordinates['left']

    vast_xml = f'''<VAST version="4.2">
<generalInfo>
  <type>{type_ad}</type>
  <background-color>{background_color}</background-color>
  <link-url>{link_url}</link-url>
  <coop-shops>{coop_shops}</coop-shops>
  <promo-code>{promo_code}</promo-code>
  <duration>{duration}</duration>
</generalInfo>
<elements>
  <element0>
    <type>{type_elemnt}</type>
    <content>{content}</content>
    <font-size>{font_size}</font-size>
    <color>{color}</color>
    <text_decoration>{text_decoration}</text_decoration>
    <font-weight>{font_weight}</font-weight>
    <text-align>{text_align}</text-align>
    <coordinates>
      <top>{coordinates_top}</top>
      <left>{coordinates_left}</left>
    </coordinates>
  </element0>
</elements>

    </VAST>'''
    return vast_xml

if __name__ == '__main__':
    app.run(debug=True, port=8000)