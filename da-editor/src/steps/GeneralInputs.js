import React from 'react';
import { banner_json } from '../data';
import './GeneralInputs.css';
import { ToolTypes } from './ToolTypes';

export const GeneralInputs = ({}) => {
    const [selects, setSelects] = React.useState();

    const renderBackgroundInput = (selects) => {
        if (selects === "Color") {
            return <div className='label-input'>
                <label htmlFor="input-bg-color">Color (Hex Code):</label>
                <input type="text" id="input-bg-color" onChange={e => changeJson("background-color", e.target.value)}/>
                </div>
        }
        else if (selects === "Image") {
            return <div className='label-input'>
                <label htmlFor="input-bg-image">Image URL:</label>
                <input type="text" id="input-bg-image" onChange={e => changeJson("background-image", e.target.value)}/>
                </div>
        }
    }

    const changeJson = (type, data) => {
        banner_json['generalInfo'][type] = data;
        console.log(banner_json);
    }

    return (
        <div>
            <h4>General Information</h4>
            <div className='general-info-inputs'>
                <div className='first-row'>
                    <div className='banner-attributes'>
                        <p>Size of Banner</p>
                        <div className='label-input'>
                            <label htmlFor="input-banner-width">Width of Banner in px:</label>
                            <input type="text" id="input-banner-width" onChange={e => changeJson("width", e.target.value)}/>
                        </div>
                        <div className='label-input'>
                            <label htmlFor="input-bg-color">Height of Banner in px:</label>
                            <input type="text" id="input-banner-height" onChange={e => changeJson("height", e.target.value)}/>
                        </div>
                    </div>
                    <div className='banner-attributes'>
                        <p>Style of Banner</p>
                        <div className='label-input'>
                        <label htmlFor="input-alignment">Alignment:</label>
                            <select id='input-alignment' onChange={e => changeJson("alignment", e.target.value)}>
                                <option>Centered</option>
                                <option>Left-aligned</option>
                                <option>Right-aligned</option>
                            </select>
                        </div>
                        <div className='label-input'>
                            <label htmlFor="input-select-bg">Type of Background:</label>
                            <select id='input-select-bg' value={selects} onChange={e => {setSelects(e.target.value); changeJson("background-type", e.target.value)}}>
                                <option></option>
                                <option>Color</option>
                                <option>Image</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="first-row">
                    <div class='banner-attributes'>
                        <p>Interactivity & Duration</p>
                        {renderBackgroundInput(selects)}
                        <div className='label-input'>
                            <label htmlFor="input-interactivity">Interactivity:</label>
                            <select type="text" id="input-interactivity" onChange={e => changeJson("interactivity", e.target.value)}>
                                <option></option>
                                <option>Link to Webpage</option>
                                <option>Email Subscribe</option>
                                <option>Quiz</option>
                                <option>Survey</option>
                            </select>
                        </div>
                        <div className='label-input'>
                            <label htmlFor="input-duration">Duration in ms:</label>
                            <input type="text" id="input-duration" onChange={e => changeJson("duration", e.target.value)}/>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}
