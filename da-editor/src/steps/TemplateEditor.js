import React from 'react';
import './TemplateEditor.css';
import { BannerTemplate } from './BannerTemplate';
import { ElementsToolbar } from './ElementsToolbar';
import { BannerInputs } from './BannerInputs';
import { GeneralInputs } from './GeneralInputs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { banner_json } from '../data';

export const TemplateEditor = ({ template }) => {
    const [elements, setElements] = React.useState([]);
    const input_dict = {}

    function sendFile(){
        const uploadUrl = 'http://127.0.0.1:8000/upload'
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(banner_json['banner-data'])
        };
        console.log(requestMetadata.body)

        fetch(uploadUrl, requestMetadata)
        .then(res => console.log(res));
    }

    const createJson = () => {
        banner_json['elements'] = {};
        console.log(elements);
        console.log(elements.length);
        console.log(input_dict);
        for (var i=0; i < elements.length; i++){
            banner_json['banner-data']['elements']['element'+i] = {};
            if (elements[i].type == 'text'){
                banner_json['banner-data']["elements"]['element'+i]['type'] = elements[i].type;
                banner_json['banner-data']["elements"]['element'+i]['content'] = input_dict['element'+i];
                banner_json['banner-data']["elements"]['element'+i]['font-size'] = '20px';
                banner_json['banner-data']["elements"]['element'+i]['color'] = 'black';
                banner_json['banner-data']["elements"]['element'+i]['text_decoration'] = "none";
                banner_json['banner-data']["elements"]['element'+i]['font-weight'] = "normal";
            } else {
                banner_json['banner-data']["elements"]['element'+i]['type'] = elements[i].type;
                banner_json['banner-data']["elements"]['element'+i]['url'] = input_dict['element'+i];
                banner_json['banner-data']["elements"]['element'+i]['width'] = '';
                banner_json['banner-data']["elements"]['element'+i]['height'] = '';
            } 
            banner_json['banner-data']["elements"]['element'+i]['coordinates'] = {};
            banner_json['banner-data']["elements"]['element'+i]['coordinates']['top'] = elements[i].y
            banner_json['banner-data']["elements"]['element'+i]['coordinates']['left'] = elements[i].x
        }
        console.log(banner_json)
        console.log(JSON.stringify(banner_json))
        sendFile()
    }

    return (
        <div>
            <h2>Template Editor</h2>
            Selected template: {template}
            <div className='editor'>
                <DndProvider backend={HTML5Backend}>
                <div className='tv-background'></div>
                <div className='banner-overlay'>
                    <BannerTemplate template={template} elements={elements} setElements={setElements} json={banner_json}/>
                </div>
                <div className='elements-toolbar'>
                    <ElementsToolbar />
                </div>
                </DndProvider>
            </div>
            <div className='banner-inputs'>
                <div className='general-info'>
                    <GeneralInputs json={banner_json}/>
                </div>
                <div className='individual-info'>
                    <BannerInputs elements={elements} input_dict={input_dict}/>
                </div>
                <div className='submit-banner'>
                    <button className='sumbit-banner-button' onClick={createJson}>Save Banner Instance as JSON</button>
                </div>
            </div>
        </div>
    );
}