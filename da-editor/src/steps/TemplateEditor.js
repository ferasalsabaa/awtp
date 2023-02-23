import React from 'react';
import './TemplateEditor.css';
import { BannerTemplate } from './BannerTemplate';
import { ElementsToolbar } from './ElementsToolbar';
import { BannerInputs } from './BannerInputs';
import { GeneralInputs } from './GeneralInputs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToolTypes } from './ToolTypes';
import { banner_json } from '../data';

export const TemplateEditor = ({ template }) => {
    const [elements, setElements] = React.useState([]);
    console.log(elements)
    const input_dict = {}

    if (template === 0){
        banner_json['banner-data']['generalInfo']['type'] = 'standard-banner';
    } else if (template === 1){
        banner_json['banner-data']['generalInfo']['type'] = 'l-banner';
    } 

    const sendFile = () => {
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
        console.log("Elements: ", elements);
        console.log("Length of Elements", elements.length);
        console.log("Input Dict", input_dict);
        for (var i=0; i < elements.length; i++){
            banner_json['banner-data']['elements']['element'+i] = {};
            if (elements[i].type == 'text'){
                banner_json['banner-data']["elements"]['element'+i]['type'] = elements[i].type;
                banner_json['banner-data']["elements"]['element'+i]['content'] = elements[i].content;
                banner_json['banner-data']["elements"]['element'+i]['font-size'] = elements[i].font_size;
                banner_json['banner-data']["elements"]['element'+i]['color'] = elements[i].color;
                banner_json['banner-data']["elements"]['element'+i]['text_decoration'] = elements[i].text_decoration;
                banner_json['banner-data']["elements"]['element'+i]['font-weight'] = elements[i].font_weight;
                banner_json['banner-data']["elements"]['element'+i]['text-align'] = elements[i].text_align;
            } else {
                banner_json['banner-data']["elements"]['element'+i]['type'] = elements[i].type;
                banner_json['banner-data']["elements"]['element'+i]['url'] = input_dict['element'+i]['image-url'];
                banner_json['banner-data']["elements"]['element'+i]['width'] = input_dict['element'+i]['width'];
                banner_json['banner-data']["elements"]['element'+i]['height'] = input_dict['element'+i]['height'];
            } 
            if (template === 1){
                banner_json['banner-data']["elements"]['element'+i]['area'] = input_dict['element'+i]['area']
            }
            banner_json['banner-data']["elements"]['element'+i]['coordinates'] = {};
            banner_json['banner-data']["elements"]['element'+i]['coordinates']['top'] = elements[i].y
            banner_json['banner-data']["elements"]['element'+i]['coordinates']['left'] = elements[i].x
        }
        console.log(banner_json)
        console.log(JSON.stringify(banner_json))
    }
    
    return (
        <div>
            <h2>Template Editor</h2>
            Selected template: {template}
            <div className='da-editor'>
                <div className='general-info'>
                    <GeneralInputs template={template} banner_json={banner_json}/>
                </div>
                <div className='editor'>
                    <DndProvider backend={HTML5Backend}>
                    <div className='tv-background'>
                        <img src={require('/Users/fawazbechara/Documents/Uni/Master@TU/awtp/da-editor/src/Background.png')}/>
                    </div>
                    <div className='banner-overlay'>
                        <BannerTemplate template={template} elements={elements} setElements={setElements}/>
                    </div>
                    <div className='elements-toolbar'>
                        <ElementsToolbar />
                    </div>
                    </DndProvider>
                </div>
            </div>
            <div className='banner-inputs'>
                <div className='individual-info'>
                    <BannerInputs template={template} elements={elements} input_dict={input_dict} setElements={setElements}/>
                </div>
                <div class='action-buttons'>
                    <div className='submit-banner'>
                        <button className='sumbit-banner-button' onClick={createJson}>Save Banner as JSON</button>
                    </div>
                    <div className='submit-banner'>
                        <button className='sumbit-banner-button' onClick={sendFile}>Send Json File to Server</button>
                    </div>
                </div>
            </div>
        </div>
    );
}