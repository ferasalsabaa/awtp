import React from 'react';
import './BannerTemplate.css';
import { useDrop, useDragDropManager } from 'react-dnd'
import { ToolTypes } from './ToolTypes';
import { mergeRefs } from "react-merge-refs";
import { banner_json } from '../data';

export const BannerTemplate = ({ template, elements, setElements }) => {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    // const monitor_L_Banner_Left = dragDropManager.getMonitor();
    // const monitor_L_Banner_Bottom = dragDropManager.getMonitor();
    const dropZone = React.useRef();
    const dropZone_L_Banner_Left = React.useRef();
    const dropZone_L_Banner_Bottom = React.useRef();

    const addElement = (type, coordinates, area) => {
        const newElement = {
            type,
            x: coordinates.x,
            y: coordinates.y,
            area
        }
        setElements((prevElements) => [...prevElements, newElement])
        // addJsonRow(elements.indexOf(newElement))
    };

    const removeElement = (x) => {
        const newElements = elements.filter((element) => element.x !== x);
        setElements(newElements)
    }

    // Needed to get cursor coords
    React.useEffect(() => monitor.subscribeToOffsetChange(() => {}), [monitor]);
    // React.useEffect(() => monitor_L_Banner_Left.subscribeToOffsetChange(() => {}), [monitor_L_Banner_Left]);
    // React.useEffect(() => monitor_L_Banner_Bottom.subscribeToOffsetChange(() => {}), [monitor_L_Banner_Bottom]);

	const [{ isOver: isOver_standard }, drop] = useDrop(
        () => ({
            accept: [ToolTypes.Text,ToolTypes.Image],
			drop: function (item, monitor) {
                const cursorOffset = monitor.getClientOffset()
                const containerRect = dropZone.current?.getBoundingClientRect()
                const containerOffset = { x: containerRect.left, y: containerRect.top }
                const position = { x: cursorOffset.x - containerOffset.x, y: cursorOffset.y - containerOffset.y }
                addElement(item.type, position, 'standard')
             },
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[],
	)
	const [{ isOver : isOver_left }, drop_left] = useDrop(
        () => ({
            accept: [ToolTypes.Text,ToolTypes.Image],
			drop: function (item, monitor) {
                const cursorOffset = monitor.getClientOffset()
                const containerRect = dropZone_L_Banner_Left.current?.getBoundingClientRect()
                const containerOffset = { x: containerRect.left, y: containerRect.top }
                const position = { x: cursorOffset.x - containerOffset.x, y: cursorOffset.y - containerOffset.y }
                addElement(item.type, position, 'left')
             },
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[],
	)
	const [{ isOver: isOver_bottom }, drop_bottom] = useDrop(
        () => ({
            accept: [ToolTypes.Text,ToolTypes.Image],
			drop: function (item, monitor) {
                const cursorOffset = monitor.getClientOffset()
                const containerRect = dropZone_L_Banner_Bottom.current?.getBoundingClientRect()
                const containerOffset = { x: containerRect.left, y: containerRect.top }
                const position = { x: cursorOffset.x - containerOffset.x, y: cursorOffset.y - containerOffset.y }
                addElement(item.type, position, 'bottom')
             },
			collect: (monitor) => ({
				isOver: !!monitor.isOver(),
				canDrop: !!monitor.canDrop(),
			}),
		}),
		[],
	)

    const isOver = isOver_bottom || isOver_left || isOver_standard

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
                    else if (element.type === ToolTypes.Image){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-portrait-element" style={{top: top_pos, left: left_pos,}}>
                            Image {index}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    }
                    return null;
                })}</div>
            </>
        );
    }
    if (template === 1) {
        return (
            <>
                <div ref={mergeRefs([drop_left, dropZone_L_Banner_Left])} className={`banner-L-left ${isOver ? 'is-over' : ''}`}>{elements.filter((element) => element.area === 'left').map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>Text{index}</div>
                    }
                    else if (element.type === ToolTypes.Image){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-portrait-element" style={{top: top_pos, left: left_pos,}}>Image{index}</div>
                    } 
                    return null;
                })}</div>
                <div ref={mergeRefs([drop_bottom, dropZone_L_Banner_Bottom])} className={`banner-L-bottom ${isOver ? 'is-over' : ''}`}>{elements.filter((element) => element.area === 'bottom').map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>Text{index}</div>
                    }
                    else if (element.type === ToolTypes.Portrait){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-portrait-element" style={{top: top_pos, left: left_pos,}}>Image{index}</div>
                    }
                    return null;
                })}</div>
            </>
        );
    }
    return null;
}