import React from 'react';
import './BannerTemplate.css';
import { useDrop, useDragDropManager } from 'react-dnd'
import { ToolTypes } from './ToolTypes';
import { mergeRefs } from "react-merge-refs";

export const BannerTemplate = ({ template, elements, setElements}) => {
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    const dropZone_standard = React.useRef();
    const dropZone_L_Banner_Left = React.useRef();
    const dropZone_L_Banner_Bottom = React.useRef();

    const addElement = (type, coordinates, area) => {
        // TODO: Add check for x + width not out of bounds (same with y + height)
        if (type == "text"){
            const newElement = {
                type,
                x: coordinates.x,
                y: coordinates.y,
                area,
                content: "",
                font_size: "",
                color: "",
                text_decoration: "",
                font_weight: "",
                text_align: "",
            }
            setElements((prevElements) => [...prevElements, newElement])
        }else if (type == "image"){
            const newElement = {
                type,
                x: coordinates.x,
                y: coordinates.y,
                area,
                url: "",
                width: "",
                height: ""
            }
            setElements((prevElements) => [...prevElements, newElement])
        }
    };

    const removeElement = (x) => {
        const newElements = elements.filter((element) => element.x !== x);
        setElements(newElements)
    }

    // Needed to get cursor coords
    React.useEffect(() => monitor.subscribeToOffsetChange(() => {}), [monitor]);

	const [{ isOver: isOver_standard }, drop] = useDrop(
        () => ({
            accept: [ToolTypes.Text,ToolTypes.Image],
			drop: function (item, monitor) {
                const cursorOffset = monitor.getClientOffset()
                const containerRect = dropZone_standard.current?.getBoundingClientRect()
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
    const width = template?.['generalInfo']?.['width'] || '60%';
    const height = template?.['generalInfo']?.['height'] || '100px';
    const alignment = template?.['generalInfo']?.['alignment'] || 'center';
    const backgroundColor = template?.['generalInfo']?.['background-color'] || 'rgba(107, 123, 156, 0.5)';
    
    const alignmentStyles = alignment === 'center' ? {
        left: "50%",
        transform: "translateX(-50%)",
    } : alignment === 'left' ? {
        left: "10%",
    } : alignment === 'right' ? {
        right: "10%",
    } : {};

    if (template.generalInfo.type === 'standard-banner') {
        return (
            <>
                <div ref={mergeRefs([drop, dropZone_standard])} className={`banner-standard ${isOver ? 'is-over' : ''}`}  style={{width, height, backgroundColor, ...alignmentStyles}}>{elements.map((element, index) => {
                    // define new variables that are saving the middle of the div
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos, fontSize: element.font_size, textDecoration: element.text_decoration, color: element.color, fontWeight: element.font_weight, textAlign: element.text_align}}>
                            {element.content}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    }
                    else if (element.type === ToolTypes.Image){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-image-element" style={{top: top_pos, left: left_pos, width: element.width || '70px', height: element.height || '70px'}}>
                            Image {index}
                            <img src={element.url}/>
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
    if (template.generalInfo.type === 'l-banner') {
        return (
            <>
                <div ref={mergeRefs([drop_left, dropZone_L_Banner_Left])} className={`banner-L-left ${isOver ? 'is-over' : ''}`} style={{width, backgroundColor, bottom: height}}>{elements.filter((element) => element.area === 'left').map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>
                            {element.content}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    }
                    else if (element.type === ToolTypes.Image){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-image-element" style={{top: top_pos, left: left_pos, width: element.width || '70px', height: element.height || '70px'}}>
                            <img src={element.url}/>
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    } 
                    return null;
                })}</div>
                <div ref={mergeRefs([drop_bottom, dropZone_L_Banner_Bottom])} className={`banner-L-bottom ${isOver ? 'is-over' : ''}`} style={{height, backgroundColor}}>{elements.filter((element) => element.area === 'bottom').map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>
                            {element.content}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    }
                    else if (element.type === ToolTypes.Image){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-image-element" style={{top: top_pos, left: left_pos,}}>
                            Image{index}
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
    return null;
}