import React from 'react';
import './BannerTemplate.css';
import { BannerInputs } from './BannerInputs';
import { useDrop, useDragDropManager } from 'react-dnd'
import { ToolTypes } from './ToolTypes';
import { mergeRefs } from "react-merge-refs";

export const BannerTemplate = ({ template }) => {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    // const monitor_L_Banner_Left = dragDropManager.getMonitor();
    // const monitor_L_Banner_Bottom = dragDropManager.getMonitor();
    const dropZone = React.useRef();
    // const dropZone_L_Banner_Left = React.useRef();
    // const dropZone_L_Banner_Bottom = React.useRef();
    const [elements, setElements] = React.useState([]);
    const [banner_inputs, setInputs] = React.useState([]);

    const addInputField = (type, coordinates) => {
        const newInput = {
            type,
            x : coordinates.x
        }
        setInputs((prevElements) => [...prevElements, newInput])
    };
    
    const addElement = (type, coordinates) => {
        const newElement = {
            type,
            x: coordinates.x,
            y: coordinates.y,
        }
        setElements((prevElements) => [...prevElements, newElement])
    };

    const removeElement = (x) => {
        console.log(elements)
        const newElements = elements.filter((element) => element.x !== x);
        setElements(newElements)
        const newInputs = banner_inputs.filter((element) => element.x !== x)
        setInputs(newInputs)
    }

    // Needed to get cursor coords
    React.useEffect(() => monitor.subscribeToOffsetChange(() => {}), [monitor]);
    // React.useEffect(() => monitor_L_Banner_Left.subscribeToOffsetChange(() => {}), [monitor_L_Banner_Left]);
    // React.useEffect(() => monitor_L_Banner_Bottom.subscribeToOffsetChange(() => {}), [monitor_L_Banner_Bottom]);

	const [{ isOver }, drop] = useDrop(
		() => ({
			accept: [ToolTypes.Text,ToolTypes.Portrait, ToolTypes.Landscape, ToolTypes.Skyscraper],
			drop: function (item) { 
                const cursorOffset = monitor.getClientOffset()
                const containerRect = dropZone.current?.getBoundingClientRect()
                const containerOffset = { x: containerRect.left, y: containerRect.top }
                const position = { x: cursorOffset.x - containerOffset.x, y: cursorOffset.y - containerOffset.y }
                addElement(item.type, position)
                addInputField(item.type, position)
             },
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[],
	)
    // const [{ isOver_L_Banner_Left }, drop_L_Banner_Left] = useDrop(
	// 	() => ({
	// 		accept: [ToolTypes.Text,ToolTypes.Portrait, ToolTypes.Landscape, ToolTypes.Skyscraper],
	// 		drop_L_Banner_Left: function (item) { 
    //             const cursorOffset = monitor_L_Banner_Left.getClientOffset()
    //             const containerRect = dropZone.current?.getBoundingClientRect()
    //             const containerOffset = { x: containerRect.left, y: containerRect.top }
    //             const position = { x: cursorOffset.x - containerOffset.x, y: cursorOffset.y - containerOffset.y }
    //             addElement(item.type, position)
    //          },
	// 		collect: (monitor_L_Banner_Left) => ({
	// 			isOver_L_Banner_Left: !!monitor_L_Banner_Left.isOver(),
	// 			canDrop_L_Banner_Left: !!monitor_L_Banner_Left.canDrop(),
	// 		}),
	// 	}),
	// 	[],
	// )
    // const [{ isOver_L_Banner_Bottom }, drop_L_Banner_Bottom] = useDrop(
	// 	() => ({
	// 		accept: [ToolTypes.Text,ToolTypes.Portrait, ToolTypes.Landscape, ToolTypes.Skyscraper],
	// 		drop_L_Banner_Bottom: function (item) { 
    //             const cursorOffset = monitor_L_Banner_Bottom.getClientOffset()
    //             const containerRect = dropZone.current?.getBoundingClientRect()
    //             const containerOffset = { x: containerRect.left, y: containerRect.top }
    //             const position = { x: cursorOffset.x - containerOffset.x, y: cursorOffset.y - containerOffset.y }
    //             addElement(item.type, position)
    //          },
	// 		collect: (monitor_L_Banner_Bottom) => ({
	// 			isOver_L_Banner_Bottom: !!monitor_L_Banner_Bottom.isOver(),
	// 			canDrop_L_Banner_Bottom: !!monitor_L_Banner_Bottom.canDrop(),
	// 		}),
	// 	}),
	// 	[],
	// )

    if (template === 0) {
        return (
            <>
                <div ref={mergeRefs([drop, dropZone])} className={`banner-standard ${isOver ? 'is-over' : ''}`}>{elements.map((element, index) => {
                    // define new variables that are saving the middle of the div
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>
                            <div className='banner-element'>
                                Text {index}
                            </div>
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    }
                    else if (element.type === ToolTypes.Portrait){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-portrait-element" style={{top: top_pos, left: left_pos,}}>
                            Portrait {index}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    } 
                    else if (element.type === ToolTypes.Landscape){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-landscape-element" style={{top: top_pos, left: left_pos,}}>
                            Landscape {index}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    } 
                    else if (element.type === ToolTypes.Skyscraper){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-skyscraper-element" style={{top: top_pos, left: left_pos,}}>
                            Sky {index}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    } 
                    return null;
                })}</div>
                <div className='input-fields'>
                    <h4>The input fields will appear here after elements are added to the banner</h4>
                    <div className='banner-inputs'>{banner_inputs.map((input_field, index) => {
                        if (input_field.type === ToolTypes.Text) {
                            return <div key={index} className="banner-text-element-input">
                                <label for="text_input">Text {index} eingeben: </label>
                                <input type="text" id="text_input"/>
                            </div>
                        }
                        else if (input_field.type === ToolTypes.Portrait){
                            return <div key={index} className="banner-text-element-input">
                                <label for="portrait_input">Portrait {index} URL eingeben: </label>
                                <input type="text" id="portrait_input"/>
                            </div>
                        } 
                        else if (input_field.type === ToolTypes.Landscape){
                            return <div key={index} className="banner-text-element-input">
                                <label for="landscape_input">Landscape {index} URL eingeben: </label>
                                <input type="text" id="landscape_input"/>
                            </div>
                        } 
                        else if (input_field.type === ToolTypes.Skyscraper){
                            return <div key={index} className="banner-text-element-input">
                                <label for="skyscraper_input">Skyscraper {index} URL eingeben: </label>
                                <input type="text" id="skyscraper_input"/>
                            </div>
                        } 
                        return null;
                    })}</div>
                    <div className='submit-banner-button'>
                        <button className='sumbit-banner'>Save Banner Instance as JSON</button>
                    </div>
                </div>
            </>
        );
    }
    if (template === 1) {
        return (
            <>
                <div ref={mergeRefs([drop, dropZone])} className={`banner-L-left ${isOver ? 'is-over' : ''}`}>{elements.map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>Text</div>
                    }
                    else if (element.type === ToolTypes.Portrait){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-portrait-element" style={{top: top_pos, left: left_pos,}}>Portrait</div>
                    } 
                    else if (element.type === ToolTypes.Landscape){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-landscape-element" style={{top: top_pos, left: left_pos,}}>Landscape</div>
                    } 
                    else if (element.type === ToolTypes.Skyscraper){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-skyscraper-element" style={{top: top_pos, left: left_pos,}}>Skyscraper</div>
                    } 
                    return null;
                })}</div>
                <div ref={mergeRefs([drop, dropZone])} className={`banner-L-bottom ${isOver ? 'is-over' : ''}`}>{elements.map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>Text</div>
                    }
                    else if (element.type === ToolTypes.Portrait){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-portrait-element" style={{top: top_pos, left: left_pos,}}>Portrait</div>
                    } 
                    else if (element.type === ToolTypes.Landscape){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-landscape-element" style={{top: top_pos, left: left_pos,}}>Landscape</div>
                    } 
                    else if (element.type === ToolTypes.Portrait){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-skyscraper-element" style={{top: top_pos, left: left_pos,}}>Skyscraper</div>
                    } 
                    return null;
                })}</div>
            </>
        );
    }
    return null;
}