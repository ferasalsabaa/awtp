import React from 'react';
import './BannerInputs.css';
import { ToolTypes } from './ToolTypes';
import { banner_json } from '../data';

export const BannerInputs = ({elements, input_dict}) => {
    const createDictEntry = (index_element) => {
        input_dict[index_element] = {}
    }

    const changeDict = (item, parameter,  data) => {
        console.log(item)
        input_dict[item][parameter] = data
        console.log(input_dict)
    }

    return (
        <>
            <h4>Element Information</h4>
            <div className='input-fields'>{elements.map((element, index) => {
                createDictEntry('element'+index)
                if (element.type === ToolTypes.Text) {
                    // console.log(element)
                    return <div key={index} className="banner-element-input">
                        <div className='banner-label-input'>
                            <label hmtlFor="text_input_content">Text {index}:</label>
                            <input type="text" id="text_input_content" onChange={e => changeDict("element"+index, 'content', e.target.value)}/>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="text_input">Font Size:</label>
                            <select id='text_input_font_size' onChange={e => changeDict("element"+index, 'font-size', e.target.value)}>
                                <option></option>
                                <option>14px</option>
                                <option>16px</option>
                                <option>18px</option>
                                <option>20px</option>
                            </select>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="text_input_color">Color:</label>
                            <select id='text_input_color' onChange={e => changeDict("element"+index, 'color', e.target.value)}>
                                <option></option>
                                <option>Black</option>
                                <option>White</option>
                                <option>Grey</option>
                                <option>Blue</option>
                                <option>Red</option>
                            </select>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="text_input_decoration">Text Decoration:</label>
                            <select id='text_input_decoration' onChange={e => changeDict("element"+index, 'text-decoration', e.target.value)}>
                                <option></option>
                                <option>none</option>
                                <option>underline</option>
                                <option>underline dotted</option>
                                <option>line-through</option>
                                <option>overline</option>
                            </select>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="text_input_font_weight">Font Weight:</label>
                            <select id='text_input_font_weight' onChange={e => changeDict("element"+index, 'font-weight', e.target.value)}>
                                <option></option>
                                <option>normal</option>
                                <option>lighter</option>
                                <option>bold</option>
                                <option>bolder</option>
                            </select>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="text_input_text_align">Text Align:</label>
                            <select id='text_input_text_align' onChange={e => changeDict("element"+index, 'text-align', e.target.value)}>
                                <option></option>
                                <option>center</option>
                                <option>left</option>
                                <option>right</option>
                            </select>
                        </div>
                    </div>
                }
                else if (element.type === ToolTypes.Image){
                    return <div key={index} className="banner-element-input">
                        <div className='banner-label-input'>
                            <label hmtlFor="image_input_url">Image {index} URL:</label>
                            <input type="text" id="image_input_url" onChange={e => changeDict("element"+index, 'image-url', e.target.value)}/>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="image_input_width">Width:</label>
                            <input type="text" id="image_input_width" onChange={e => changeDict("element"+index, 'image-width', e.target.value)}/>
                        </div>
                        <div className='banner-label-input'>
                            <label hmtlFor="image_input_height">Height:</label>
                            <input type="text" id="image_input_height" onChange={e => changeDict("element"+index, 'image-height', e.target.value)}/>
                        </div>
                    </div>
                }
                return null;
            })}</div>
        </>
    );
}
