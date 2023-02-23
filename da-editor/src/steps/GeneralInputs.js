import React from 'react';
import './GeneralInputs.css';
import { ToolTypes } from './ToolTypes';

export const GeneralInputs = ({template, banner_json}) => {
    const [selects, setSelects] = React.useState();
    const [selectInteractivity, setSelectInteractivity] = React.useState();

    const renderBackgroundInput = (selects) => {
        if (selects === "Color") {
            return <div className='label-input'>
                <label htmlFor="input-bg-color">Color:</label>
                <input type="text" id="input-bg-color" onChange={e => changeJson("background-color", e.target.value)}/>
                </div>
        }
        else if (selects === "Image") {
            return <div className='label-input'>
                <label htmlFor="input-bg-image">URL:</label>
                <input type="text" id="input-bg-image" onChange={e => changeJson("background-image", e.target.value)}/>
                </div>
        }
    }

    const changeJson = (type, data) => {
        if (type=='alignment'){
            banner_json['banner-data']['generalInfo'][type] = {}
            if (data == 'Centered'){
                banner_json['banner-data']['generalInfo'][type]['left'] = '200px';
            } else if (data == 'Left-aligned'){
                banner_json['banner-data']['generalInfo'][type]['left'] = '10px';
            } else if (data == 'Right-aligned'){
                banner_json['banner-data']['generalInfo'][type]['right'] = '10px';
            }
            banner_json['banner-data']['generalInfo'][type]['top'] = '500px';
        } else{
            banner_json['banner-data']['generalInfo'][type] = data;
        }
        console.log(banner_json);
    }
    
    if (template === 0){
        return (
            <div>
                <h4>General Information</h4>
                <div className='general-info-inputs'>
                    <div className='label-input'>
                        <label htmlFor="input-banner-width">Width:</label>
                        <input type="text" id="input-banner-width" onChange={e => changeJson("width", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-bg-color">Height:</label>
                        <input type="text" id="input-banner-height" onChange={e => changeJson("height", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                    <label htmlFor="input-alignment">Alignment:</label>
                        <select id='input-alignment' onChange={e => changeJson("alignment", e.target.value)}>
                            <option>Centered</option>
                            <option>Left-aligned</option>
                            <option>Right-aligned</option>
                        </select>
                    </div>
                    {renderBackgroundInput('Color')}
                    <div className='label-input'>
                        <label htmlFor="input-bg-link-url">Link:</label>
                        <input type="text" id="input-banner-link-url" onChange={e => changeJson("link-url", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-bg-coop-shops">Shops:</label>
                        <input type="text" id="input-banner-coop-shops" onChange={e => changeJson("coop-shops", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-bg-promo-code">PromoCode:</label>
                        <input type="text" id="input-banner-promo-code" onChange={e => changeJson("promo-code", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-duration">Duration:</label>
                        <input type="text" id="input-duration" onChange={e => changeJson("duration", e.target.value)}/>
                    </div>
                </div>
            </div>
        );
    }
    if (template === 1){
        return(
            <div>
                <h4>General Information</h4>
                <div className='general-info-inputs'>
                    {renderBackgroundInput('Color')}
                    <div className='label-input'>
                        <label htmlFor="input-bg-link-url">Link:</label>
                        <input type="text" id="input-banner-link-url" onChange={e => changeJson("link-url", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-bg-coop-shops">Shops:</label>
                        <input type="text" id="input-banner-coop-shops" onChange={e => changeJson("coop-shops", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-bg-promo-code">PromoCode:</label>
                        <input type="text" id="input-banner-promo-code" onChange={e => changeJson("promo-code", e.target.value)}/>
                    </div>
                    <div className='label-input'>
                        <label htmlFor="input-duration">Duration:</label>
                        <input type="text" id="input-duration" onChange={e => changeJson("duration", e.target.value)}/>
                    </div>
                </div>
            </div>
        )
    }
}
