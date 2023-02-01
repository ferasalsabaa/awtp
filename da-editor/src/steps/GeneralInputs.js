import React from 'react';
import './GeneralInputs.css';
import { ToolTypes } from './ToolTypes';

export const GeneralInputs = ({}) => {
    const [selects, setSelects] = React.useState();

    const renderBackgroundInput = (selects) => {
        if (selects === "Color") {
            return <div className='label-input'>
                <label htmlFor="input-bg-color">Color (Hex Code):</label>
                <input type="text" id="input-bg-color"/>
                </div>
        }
        else if (selects === "Image") {
            return <div className='label-input'>
                <label htmlFor="input-bg-image">Image URL:</label>
                <input type="text" id="input-bg-image"/>
                </div>
        }
    }

    return (
        <div>
            <h4>General Information</h4>
            <div className='general-info-inputs'>
                <div className='label-input'>
                    <label htmlFor="input-banner-width">Width of Banner in px:</label>
                    <input type="text" id="input-banner-width"/>
                </div>
                <div className='label-input'>
                    <label htmlFor="input-bg-color">Height of Banner in px:</label>
                    <input type="text" id="input-banner-height"/>
                </div>
                <div className='label-input'>
                <label htmlFor="input-alignment">Alignment:</label>
                    <select id='input-alignment'>
                        <option>Centered</option>
                        <option>Left-aligned</option>
                        <option>Right-aligned</option>
                    </select>
                </div>
                <div className='label-input'>
                    <label htmlFor="input-select-bg">Type of Background:</label>
                    <select id='input-select-bg' value={selects} onChange={e => setSelects(e.target.value)}>
                        <option></option>
                        <option>Color</option>
                        <option>Image</option>
                    </select>
                </div>
                {renderBackgroundInput(selects)}
                <div className='label-input'>
                    <label htmlFor="input-interactivity">Interactivity:</label>
                    <select type="text" id="input-interactivity">
                        <option></option>
                        <option>Link to Webpage</option>
                        <option>Email Subscribe</option>
                        <option>Quiz</option>
                        <option>Survey</option>
                    </select>
                </div>
                <div className='label-input'>
                    <label htmlFor="input-duration">Duration in ms:</label>
                    <input type="text" id="input-duration"/>
                </div>
            </div>
        </div>
    );
}
