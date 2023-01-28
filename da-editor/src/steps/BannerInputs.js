import React from 'react';
import './BannerInputs.css';
import { ToolTypes } from './ToolTypes';

export const BannerInputs = () => {
    const [banner_inputs, setInputs] = React.useState([]);

    const addInputField = (type) => {
        const newInput = {
            type
        }
        setInputs((prevElements) => [...prevElements, newInput])
    };

    return (
        <div>
            <h4>The input fields will appear here after elements are added to the banner</h4>
            <div className='banner-inputs'>{banner_inputs.map((input_field, index) => {
                if (input_field.type === ToolTypes.Text) {
                    return <div key={index} className="banner-text-element-input">
                        <label for="text_input">Den Text, der in Text {index} stehen soll, eingeben:</label>
                        <input type="text" id="text_input"/>
                    </div>
                }
                else if (input_field.type === ToolTypes.Portrait){
                    return <div key={index} className="banner-text-element-input">
                        <label for="portrait_input">URL für Portrait {index} eingeben:</label>
                        <input type="text" id="portrait_input"/>
                    </div>
                } 
                else if (input_field.type === ToolTypes.Landscape){
                    return <div key={index} className="banner-text-element-input">
                        <label for="landscape_input">URL für Landscape {index} eingeben:</label>
                        <input type="text" id="landscape_input"/>
                    </div>
                } 
                else if (input_field.type === ToolTypes.Skyscraper){
                    return <div key={index} className="banner-text-element-input">
                        <label for="skyscraper_input">URL für Skyscraper {index} eingeben:</label>
                        <input type="text" id="skyscraper_input"/>
                    </div>
                } 
                return null;
            })}</div>
        </div>
    );
}
