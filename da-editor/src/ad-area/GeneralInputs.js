import React from 'react';

import '../template-area/GeneralTemplateInputs.css';

export const GeneralInputs = ({ template, setAdJSON }) => {
    const changeJson = (type, data) => {
        const newJSON = {...template};
        newJSON['generalInfo'][type] = data;
        setAdJSON(newJSON)
    }

    const renderBackgroundInput = () => {
        const selectValue = document.getElementById("input-background")
        if (selectValue.value === "Color") {
            return <div className='label-input'>
                <label htmlFor="input-bg-color">Color:</label>
                <input type="text" id="input-bg-color" value={template.generalInfo['background-color'] ?? ''} onChange={e => changeJson("background-color", e.target.value)}/>
                </div>
        }
        else if (selectValue.value === "Image") {
            return <div className='label-input'>
                <label htmlFor="input-bg-image">URL:</label>
                <input type="text" id="input-bg-image" value={template.generalInfo['background-image'] ?? ''} onChange={e => changeJson("background-image", e.target.value)}/>
                </div>
        }
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
                        <label htmlFor='input-background'>Background-Type:</label>
                        <select id='input-background' onChange={e => renderBackgroundInput(e.target.value)}>
                            <option value="Color">Color</option>
                            <option value="Image">Image</option>
                        </select>
                    </div>
                    {/* {renderBackgroundInput('Color')} */}
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
                        <label htmlFor='input-background'>Background-Type:</label>
                        <select id='input-background' onChange={renderBackgroundInput}>
                            <option value="Color">Color</option>
                            <option value="Image">Image</option>
                        </select>
                    </div>
                    {/* {renderBackgroundInput()} */}
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
