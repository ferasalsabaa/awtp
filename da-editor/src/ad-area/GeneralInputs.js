import React from 'react';

import '../template-area/GeneralTemplateInputs.css';

export const GeneralInputs = ({ template, setAdJSON }) => {
    const [backgroundType, setBackgroundType] = React.useState()
    const [backgroundTypeLeft, setBackgroundTypeLeft] = React.useState()
    const [backgroundTypeBottom, setBackgroundTypeBottom] = React.useState()

    const changeJson = (type, data) => {
        console.log(type, data)
        const newJSON = {...template};
        newJSON['generalInfo'][type] = data;
        setAdJSON(newJSON)
    }

    const setBackground = (selectValue) => {
        console.log(selectValue)
        setBackgroundType(selectValue)
    }

    const setBackgroundLeft = (selectValue) => {
        console.log(selectValue)
        setBackgroundTypeLeft(selectValue)
    }

    const setBackgroundBottom = (selectValue) => {
        console.log(selectValue)
        setBackgroundTypeBottom(selectValue)
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
                        <label htmlFor='input-bg-type-left'>Background-Type Skyscraper:</label>
                        <select id='input-bg-type-left' onChange={e => {setBackgroundLeft(e.target.value); changeJson('background-type-left', e.target.value)}}>
                            <option>---</option>
                            <option value="Color">Color</option>
                            <option value="Image">Image</option>
                        </select>
                    </div>
                    {backgroundTypeLeft === 'Color' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-color-left">Color:</label>
                        <input type="text" id="input-bg-color-left" value={template.generalInfo['background-color-left'] ?? ''} onChange={e => changeJson("background-color-left", e.target.value)}/>
                        </div>
                    )}
                    {backgroundTypeLeft === 'Image' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-image-left">URL:</label>
                        <input type="text" id="input-bg-image-left" value={template.generalInfo['background-image-left'] ?? ''} onChange={e => changeJson("background-image-left", e.target.value)}/>
                        </div>
                    )}
                    <div className='label-input'>
                        <label htmlFor='input-bg-type-bottom'>Background-Type Banner:</label>
                        <select id='input-bg-type-bottom' onChange={e => {setBackgroundBottom(e.target.value); changeJson('background-type-bottom', e.target.value)}}>
                            <option>---</option>
                            <option value="Color">Color</option>
                            <option value="Image">Image</option>
                        </select>
                    </div>
                    {backgroundTypeBottom === 'Color' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-color-bottom">Color:</label>
                        <input type="text" id="input-bg-color-bottom" value={template.generalInfo['background-color-bottom'] ?? ''} onChange={e => changeJson("background-color-bottom", e.target.value)}/>
                        </div>
                    )}
                    {backgroundTypeBottom === 'Image' && (
                        <div className='label-input'>
                        <label htmlFor="input-bg-image-bottom">URL:</label>
                        <input type="text" id="input-bg-image-bottom" value={template.generalInfo['background-image-bottom'] ?? ''} onChange={e => changeJson("background-image-bottom", e.target.value)}/>
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
