import React from 'react';
import './AdEditor.css';
import { BannerTemplate } from './BannerTemplate';
import { ElementsToolbar } from './ElementsToolbar';
import { BannerInputs } from './BannerInputs';
import { GeneralInputs } from './GeneralInputs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const AdEditor = ({ template }) => {
    const [elements, setElements] = React.useState([]);
    const [adJSON, setAdJSON] = React.useState(template);

    const saveAd = () => {
        const finalJSON = storeElementsInJSON();
        const uploadUrl = 'http://127.0.0.1:8000/ads'
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(finalJSON)
        };
        console.log(requestMetadata.body)

        fetch(uploadUrl, requestMetadata)
        .then(res => console.log(res));
    }
    
    const storeElementsInJSON = () => {
        const newJSON = { ...adJSON }
        newJSON['elements'] = {}
        for (var i=0; i < elements.length; i++){
            newJSON['elements']['element'+i] = {};
            if (elements[i].type == 'text'){
                newJSON["elements"]['element'+i]['type'] = elements[i].type;
                newJSON["elements"]['element'+i]['content'] = elements[i].content;
                newJSON["elements"]['element'+i]['font-size'] = elements[i].font_size;
                newJSON["elements"]['element'+i]['color'] = elements[i].color;
                newJSON["elements"]['element'+i]['text_decoration'] = elements[i].text_decoration;
                newJSON["elements"]['element'+i]['font-weight'] = elements[i].font_weight;
                newJSON["elements"]['element'+i]['text-align'] = elements[i].text_align;
            } else {
                newJSON["elements"]['element'+i]['type'] = elements[i].type;
                newJSON["elements"]['element'+i]['url'] = elements[i].url;
                newJSON["elements"]['element'+i]['width'] = elements[i].width;
                newJSON["elements"]['element'+i]['height'] = elements[i].height;
            } 
            if (template['generalInfo']['type'] === 'l-banner'){
                newJSON["elements"]['element'+i]['area'] = elements[i].area;
            }
            newJSON["elements"]['element'+i]['coordinates'] = {};
            newJSON["elements"]['element'+i]['coordinates']['top'] = elements[i].y
            newJSON["elements"]['element'+i]['coordinates']['left'] = elements[i].x
        }
        console.log("Final JSON: ", newJSON);
        return newJSON
    }
    
    return (
        <div>
            <h2>Template Editor</h2>
            Selected template: {template.generalInfo.name}
            <div className='da-editor'>
                <DndProvider backend={HTML5Backend}>
                <div className='general-info'>
                    <GeneralInputs template={template} setAdJSON={setAdJSON} />
                    <div className='elements-toolbar'>
                        <ElementsToolbar />
                    </div>
                </div>
                <div className='editor-inputs'>
                    <div className='editor'>
                        <div className='tv-background'>
                            <img src={require('../Background.png')}/>
                        </div>
                        <div className='banner-overlay'>
                            <BannerTemplate template={template} elements={elements} setElements={setElements}/>
                        </div>
                    </div>
                    <div className='banner-inputs'>
                        <div className='individual-info'>
                            <BannerInputs template={template} elements={elements} setElements={setElements}/>
                        </div>
                        <div className='action-buttons'>
                            <div className='submit-banner'>
                                <button className='sumbit-banner-button' onClick={saveAd}>Save Banner Instance</button>
                            </div>
                        </div>
                    </div>
                </div>
                </DndProvider>
            </div>
        </div>
    );
}