import React from 'react';
import './BannerInputs.css';
import { ToolTypes } from './ToolTypes';
import { ElementsToolbar } from './ElementsToolbar';
import { banner_json } from '../data';

export const BannerInputs = ({template, elements, input_dict, setElements}) => {
    const createDictEntry = (index_element) => {
        input_dict[index_element] = {}
    }

    const changeDict = (item, parameter,  data) => {
        input_dict[item][parameter] = data
    }

    const changeElem = (attr, elem, elemValue) => {
        const new_elem = elements.map(e => {
            if (e.x === elem.x){
                if(elem.type === 'text'){
                    if(attr === 'content'){
                        return {...e, content: elemValue}
                    } else if (attr === 'font-size'){
                        return {...e, font_size: elemValue}
                    } else if (attr === 'color'){
                        return {...e, color: elemValue}
                    } else if (attr === 'text-decoration'){
                        return {...e, text_decoration: elemValue}
                    } else if (attr === 'font-weight'){
                        return {...e, font_weight: elemValue}
                    } else if (attr === 'text-align'){
                        return {...e, text_align: elemValue}
                    }
                } else if (elem.type === 'image'){
                    if (attr === 'url'){
                        return {...e, url: elemValue}
                    } else if (attr === 'width'){
                        return {...e, width: elemValue}
                    } else if (attr === 'height'){
                        return {...e, height: elemValue}
                    }
                }
            } else {
                return e
            }
        });
        setElements(new_elem)
        console.log(elements)
    }

    if (template === 0){
        return (
            <>
                <h4>Element Information</h4>
                <div className='input-fields'>{elements.map((element, index) => {
                    createDictEntry('element'+index)
                    if (element.type === ToolTypes.Text) {
                        return <div key={index} className="banner-element-input">
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_content">Text {index}:</label>
                                <input type="text" id="text_input_content" onChange={e => {changeDict("element"+index, 'content', e.target.value); changeElem('content', element, e.target.value)}}/>
                            </div> 
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input">Font Size:</label>
                                <select id='text_input_font_size' onChange={e => {changeDict("element"+index, 'font-size', e.target.value); changeElem('font-size', element, e.target.value)}}>
                                    <option></option>
                                    <option>14px</option>
                                    <option>16px</option>
                                    <option>18px</option>
                                    <option>20px</option>
                                </select>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_color">Color:</label>
                                <select id='text_input_color' onChange={e => {changeDict("element"+index, 'color', e.target.value); changeElem('color', element, e.target.value)}}>
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
                                <select id='text_input_decoration' onChange={e => {changeDict("element"+index, 'text-decoration', e.target.value); changeElem('text-decoration', element, e.target.value)}}>
                                    <option></option>
                                    <option>none</option>
                                    <option>underline</option>
                                    <option>line-through</option>
                                    <option>overline</option>
                                </select>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_font_weight">Font Weight:</label>
                                <select id='text_input_font_weight' onChange={e => {changeDict("element"+index, 'font-weight', e.target.value); changeElem('font-weight', element, e.target.value)}}>
                                    <option></option>
                                    <option>normal</option>
                                    <option>lighter</option>
                                    <option>bold</option>
                                    <option>bolder</option>
                                </select>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_text_align">Text Align:</label>
                                <select id='text_input_text_align' onChange={e => {changeDict("element"+index, 'text-align', e.target.value); changeElem('text-align', element, e.target.value)}}>
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
                                <input type="text" id="image_input_url" onChange={e => {changeDict("element"+index, 'image-url', e.target.value); changeElem('url', element, e.target.value)}}/>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="image_input_width">Width:</label>
                                <input type="text" id="image_input_width" onChange={e => {changeDict("element"+index, 'image-width', e.target.value); changeElem('width' ,element, e.target.value)}}/>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="image_input_height">Height:</label>
                                <input type="text" id="image_input_height" onChange={e => {changeDict("element"+index, 'image-height', e.target.value); changeElem('height' ,element, e.target.value)}}/>
                            </div>
                        </div>
                    }
                    return null;
                })}</div>
            </>
        );
    }
    if (template === 1){
        return (
            <>
                <h4>Element Information</h4>
                <div className='input-fields'>{elements.map((element, index) => {
                    createDictEntry('element'+index)
                    changeDict("element"+index, 'area', element.area)
                    if (element.type === ToolTypes.Text) {
                        return <div key={index} className="banner-element-input">
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_content">Text {index}:</label>
                                <input type="text" id="text_input_content" onChange={e => {changeDict("element"+index, 'content', e.target.value); changeElem('content' ,element, e.target.value)}}/>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input">Font Size:</label>
                                <select id='text_input_font_size' onChange={e => {changeDict("element"+index, 'font-size', e.target.value); changeElem('font-size' ,element, e.target.value)}}>
                                    <option></option>
                                    <option>14px</option>
                                    <option>16px</option>
                                    <option>18px</option>
                                    <option>20px</option>
                                </select>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_color">Color:</label>
                                <select id='text_input_color' onChange={e => {changeDict("element"+index, 'color', e.target.value); changeElem('color', element, e.target.value)}}>
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
                                <select id='text_input_decoration' onChange={e => {changeDict("element"+index, 'text-decoration', e.target.value); changeElem('text-decoration' ,element, e.target.value)}}>
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
                                <select id='text_input_font_weight' onChange={e => {changeDict("element"+index, 'font-weight', e.target.value); changeElem('font-weight' ,element, e.target.value)}}>
                                    <option></option>
                                    <option>normal</option>
                                    <option>lighter</option>
                                    <option>bold</option>
                                    <option>bolder</option>
                                </select>
                            </div>
                            <div className='banner-label-input'>
                                <label hmtlFor="text_input_text_align">Text Align:</label>
                                <select id='text_input_text_align' onChange={e => {changeDict("element"+index, 'text-align', e.target.value); changeElem('text-align' ,element, e.target.value)}}>
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
}
