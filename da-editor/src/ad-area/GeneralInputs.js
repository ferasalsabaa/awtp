import React from 'react';

import '../template-area/GeneralTemplateInputs.css';

export const GeneralInputs = ({ template, setAdJSON }) => {
    const [backgroundType, setBackgroundType] = React.useState()
    const changeJson = (type, data) => {
        const newJSON = {...template};
        newJSON['generalInfo'][type] = data;
        setAdJSON(newJSON)
    }

    const setBackground = (selectValue) => {
        console.log(selectValue)
        setBackgroundType(selectValue)
    }
    
    if (template.generalInfo.type === 'l-banner'){
        return (
            <div>
                <h4>General Information</h4>
                <div className='general-info-inputs'>
                    <div className='label-input'>
                        <label htmlFor="input-banner-width">Width:</label>
                        <input type="text" id="input-banner-width" value={template.generalInfo.width} disabled/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-bg-color">Height:</label>
                        <input type="text" id="input-banner-height" value={template.generalInfo.height} disabled/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-alignment">Alignment:</label>
                        <select id='input-alignment' value={template.generalInfo.alignment} disabled>
                            <option value="center">Centered</option>
                            <option value="left">Left-aligned</option>
                            <option value="right">Right-aligned</option>
                        </select>
                    </div>
                    <div className='label-input'>
                        <label htmlFor='input-bg-type'>Background-Type:</label>
                        <select id='input-bg-type' onChange={e => {setBackground(e.target.value); changeJson('background-type', e.target.value)}}>
                            <option>---</option>
                            <option value="Color">Color</option>
                            <option value="Image">Image</option>
                        </select>
                    </div>
                    {backgroundType === 'Color' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-color">Color:</label>
                        <input type="text" id="input-bg-color" value={template.generalInfo['background-color'] ?? ''} onChange={e => changeJson("background-color", e.target.value)}/>
                        </div>
                    )}
                    {backgroundType === 'Image' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-image">URL:</label>
                        <input type="text" id="input-bg-image" value={template.generalInfo['background-image'] ?? ''} onChange={e => changeJson("background-image", e.target.value)}/>
                        </div>
                    )}
                    <div className='label-input'>
                        <label htmlFor="input-bg-promo-code">PromoCode:</label>
                        <input type="text" id="input-banner-promo-code" value={template.generalInfo['promo-code'] ?? ''} onChange={e => changeJson("promo-code", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-duration">Duration [ms]:</label>
                        <input type="text" id="input-duration" value={template.generalInfo['duration'] ?? ''} onChange={e => changeJson("duration", e.target.value)}/>
                    </div>
                </div>
            </div>
        );
    }
    if (template.generalInfo.type === 'standard-banner'){
        return(
            <div>
                <h4>General Information</h4>
                <div className='general-info-inputs'>
                <div className='label-input'>
                        <label htmlFor='input-bg-type'>Background-Type:</label>
                        <select id='input-bg-type' onChange={e => {setBackground(e.target.value); changeJson('background-type', e.target.value)}}>
                            <option>---</option>
                            <option value="Color">Color</option>
                            <option value="Image">Image</option>
                        </select>
                    </div>
                    {backgroundType === 'Color' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-color">Color:</label>
                        <input type="text" id="input-bg-color" value={template.generalInfo['background-color'] ?? ''} onChange={e => changeJson("background-color", e.target.value)}/>
                        </div>
                    )}
                    {backgroundType === 'Image' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-image">URL:</label>
                        <input type="text" id="input-bg-image" value={template.generalInfo['background-image'] ?? ''} onChange={e => changeJson("background-image", e.target.value)}/>
                        </div>
                    )}
                    <div className='label-input'>
                        <label htmlFor="input-bg-promo-code">PromoCode:</label>
                        <input type="text" id="input-banner-promo-code" value={template.generalInfo['promo-code'] ?? ''} onChange={e => changeJson("promo-code", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-duration">Duration [ms]:</label>
                        <input type="text" id="input-duration" value={template.generalInfo['duration'] ?? ''} onChange={e => changeJson("duration", e.target.value)}/>
                    </div>
                </div>
            </div>
        )
    }
}
