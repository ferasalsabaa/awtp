import React from 'react';
import './TemplateEditor.css';
import { BannerTemplate } from './BannerTemplate';
import { ElementsToolbar } from './ElementsToolbar';
import { BannerInputs } from './BannerInputs';
import { GeneralInputs } from './GeneralInputs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { banner_json } from '../data';
import { ToolTypes } from './ToolTypes';

export const TemplateEditor = ({ template }) => {
    const [elements, setElements] = React.useState([]);
    const input_dict = {}
    const showPreview = React.useState(false)

    if (template === 0){
        banner_json['banner-data']['generalInfo']['type'] = 'standard-banner';
    } else if (template === 1){
        banner_json['banner-data']['generalInfo']['type'] = 'l-banner';
    } 

    const sendFile = (json) => {
        const uploadUrl = 'http://127.0.0.1:8000/upload'
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(json['banner-data'])
        };
        console.log(requestMetadata.body)

        fetch(uploadUrl, requestMetadata)
        .then(res => console.log(res));
    }

    // const preview = () => {
    //     this.setState({
    //         showPreview: !this.showPreview
    //     })
    // }

    // if (this.showPreview){
    //     const myStyle = {
    //         width: banner_json['banner-data']['generalInfo']['width'],
    //         height: banner_json['banner-data']['generalInfo']['height'],
    //         backgroundColor : banner_json['banner-data']['generalInfo']['background-color']
    //     }
    //     bannerPreview = (
    //         <div style={myStyle}>
    //         </div>
    //     )
    // }

    const createJson = () => {
        console.log(elements);
        console.log(elements.length);
        console.log(input_dict);
        for (var i=0; i < elements.length; i++){
            banner_json['banner-data']['elements']['element'+i] = {};
            if (elements[i].type == 'text'){
                banner_json['banner-data']["elements"]['element'+i]['type'] = elements[i].type;
                banner_json['banner-data']["elements"]['element'+i]['content'] = input_dict['element'+i]['content'];
                banner_json['banner-data']["elements"]['element'+i]['font-size'] = input_dict['element'+i]['font-size'];
                banner_json['banner-data']["elements"]['element'+i]['color'] = input_dict['element'+i]['color'];
                banner_json['banner-data']["elements"]['element'+i]['text_decoration'] = input_dict['element'+i]['text-decoration'];
                banner_json['banner-data']["elements"]['element'+i]['font-weight'] = input_dict['element'+i]['font-weight'];
                banner_json['banner-data']["elements"]['element'+i]['text-align'] = input_dict['element'+i]['text-align'];
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
                    <GeneralInputs template={template} json={banner_json}/>
                </div>
                <div className='editor'>
                    <DndProvider backend={HTML5Backend}>
                    <div className='tv-background'>
                        <img src={require('/Users/fawazbechara/Documents/Uni/Master@TU/awtp/da-editor/src/Background.png')}/>
                    </div>
                    <div className='banner-overlay'>
                        <BannerTemplate template={template} elements={elements} setElements={setElements} json={banner_json}/>
                    </div>
                    <div className='elements-toolbar'>
                        <ElementsToolbar />
                    </div>
                    </DndProvider>
                </div>
            </div>
            <div className='banner-inputs'>
                <div className='individual-info'>
                    <BannerInputs template={template} elements={elements} input_dict={input_dict}/>
                </div>
                <div class='action-buttons'>
                    <div className='submit-banner'>
                        <button className='sumbit-banner-button' onClick={createJson}>Save Banner as JSON</button>
                    </div>
                    <div className='submit-banner'>
                        <button className='sumbit-banner-button'>Show Preview</button>
                    </div>
                    <div className='submit-banner'>
                        <button className='sumbit-banner-button' onClick={sendFile(banner_json)}>Send Json File to Server</button>
                    </div>
                </div>
            </div>
        </div>
    );
}