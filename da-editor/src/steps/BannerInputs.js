import React from 'react';
import './BannerInputs.css';
import { ToolTypes } from './ToolTypes';
import { banner_json } from '../data';

export const BannerInputs = ({elements, input_dict}) => {
    const changeDict = (item, data) => {
        console.log(item)
        input_dict[item] = data
        console.log(input_dict)
    }

    return (
        <>
            <h4>Fill the elements</h4>
            <div className='input-fields'>{elements.map((element, index) => {
                if (element.type === ToolTypes.Text) {
                    // console.log(element)
                    return <div key={index} className="banner-element-input">
                        <label hmtlFor="text_input">Text {index}:</label>
                        <input type="text" id="text_input" onChange={e => changeDict("element"+index, e.target.value)}/>
                    </div>
                }
                else if (element.type === ToolTypes.Portrait){
                    return <div key={index} className="banner-element-input">
                        <label hmtlFor="portrait_input">Portrait {index} URL:</label>
                        <input type="text" id="portrait_input" onChange={e => changeDict("element"+index, e.target.value)}/>
                    </div>
                } 
                else if (element.type === ToolTypes.Landscape){
                    return <div key={index} className="banner-element-input">
                        <label htmlFor="landscape_input">Landscape {index} URL:</label>
                        <input type="text" id="landscape_input" onChange={e => changeDict("element"+index, e.target.value)}/>
                    </div>
                } 
                else if (element.type === ToolTypes.Skyscraper){
                    return <div key={index} className="banner-element-input">
                        <label hmtlFor="skyscraper_input">Skyscraper {index} URL:</label>
                        <input type="text" id="skyscraper_input" onChange={e => changeDict("element"+index, e.target.value)}/>
                    </div>
                }
                return null;
            })}</div>
        </>
    );
}
