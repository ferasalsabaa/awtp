import React from 'react';
import './GeneralTemplateInputs.css';

export const GeneralTemplateInputs = ({template, bannerJSON, setBannerJSON}) => {

    const changeJson = (type, data) => {
        const newJSON = {...bannerJSON};
        newJSON['banner-data']['generalInfo'][type] = data;
        setBannerJSON(newJSON)
    }

    return (
        <div>
        <h4>General Information</h4>
        <div className='general-info-inputs'>
            <div className='label-input'>
                <label htmlFor="input-banner-name">Name:</label>
                <input type="text" id="input-banner-name" value={bannerJSON['banner-data'].generalInfo.name} onChange={e => changeJson("name", e.target.value)}/>
            </div>
            <div className='label-input'>
                <label htmlFor="input-banner-width">Width:</label>
                <input type="text" id="input-banner-width" value={bannerJSON['banner-data'].generalInfo.width} onChange={e => changeJson("width", e.target.value)}/>
            </div>
            <div className='label-input'>
                <label htmlFor="input-bg-color">Height:</label>
                <input type="text" id="input-banner-height" value={bannerJSON['banner-data'].generalInfo.height} onChange={e => changeJson("height", e.target.value)}/>
            </div>
            {template === 0 && (
            <div className='label-input'>
                <label htmlFor="input-alignment">Alignment:</label>
                <select id='input-alignment' onChange={e => changeJson("alignment", e.target.value)}>
                    <option value="center">Centered</option>
                    <option value="left">Left-aligned</option>
                    <option value="right">Right-aligned</option>
                </select>
            </div>
            )}
        </div>
    </div>
    )
}
