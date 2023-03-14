import React from 'react';
import './TemplateEditor.css';
import { EmptyBannerTemplate } from './EmptyBannerTemplate';
import { GeneralTemplateInputs } from './GeneralTemplateInputs';
import { initBannerJSON } from '../data';

export const TemplateEditor = ({ templateType }) => {
    const [elements, setElements] = React.useState([]);
    const [bannerJSON, setBannerJSON] = React.useState(initBannerJSON(templateType));


    if (templateType === 0){
        bannerJSON['banner-data']['generalInfo']['type'] = 'standard-banner';
    } else if (templateType === 1){
        bannerJSON['banner-data']['generalInfo']['type'] = 'l-banner';
    } 

    const saveTemplate = () => {
        const uploadUrl = 'http://127.0.0.1:8000/templates'
        const requestMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bannerJSON['banner-data'])
        };
        console.log(requestMetadata.body)

        fetch(uploadUrl, requestMetadata)
        .then(res => console.log(res));
    }
    
    return (
        <div>
            <h2>Template Creator</h2>
            Selected template: {templateType}
            <div className='da-editor'>
                <div className='general-info'>
                    <GeneralTemplateInputs template={templateType} bannerJSON={bannerJSON} setBannerJSON={setBannerJSON}/>
                    <button className='sumbit-banner-button' onClick={saveTemplate}>Save Template</button>
                </div>
                <div className='template-editor'>
                    <div className='tv-background'>
                        <img src={require('../Background.png')}/>
                    </div>
                    <div className='banner-overlay'>
                        <EmptyBannerTemplate template={templateType} bannerJSON={bannerJSON} />
                    </div>
                </div>
            </div>
        </div>
    );
}