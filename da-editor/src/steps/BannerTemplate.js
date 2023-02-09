import React from 'react';
import './BannerTemplate.css';
import { useDrop, useDragDropManager } from 'react-dnd'
import { ToolTypes } from './ToolTypes';
import { mergeRefs } from "react-merge-refs";

export const BannerTemplate = ({ template, elements, setElements, banner_json}) => {
    console.log(elements)
    const dragDropManager = useDragDropManager();
    const monitor = dragDropManager.getMonitor();
    const dropZone_standard = React.useRef();
    const dropZone_L_Banner_Left = React.useRef();
    const dropZone_L_Banner_Bottom = React.useRef();

    const addElement = (type, coordinates, area) => {
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

    if (template === 0) {
        var banner_width = banner_json['banner-data']['generalInfo']['width']
        console.log(banner_width)
        var banner_height = banner_json['banner-data']['generalInfo']['height']
        return (
            <>
                <div ref={mergeRefs([drop, dropZone_standard])} className={`banner-standard ${isOver ? 'is-over' : ''}`} style={{width: banner_width, height: banner_height}}>{elements.map((element, index) => {
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
                        return <div key={index} className="banner-image-element" style={{top: top_pos, left: left_pos,}}>
                            Image {index}
                            {/* <img src={require(element.url)} width={element.width} height={element.height}/> */}
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
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>
                            {element.content} {index}
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    }
                    else if (element.type === ToolTypes.Image){
                        top_pos = element.y - 40 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-image-element" style={{top: top_pos, left: left_pos,}}>
                            <img src={require(element.url)} width={element.width} height={element.height}/>
                            <div className='remove-button-div'>
                                <button onClick={() => removeElement(element.x)} className='remove-button'>❌</button>
                            </div>
                            </div>
                    } 
                    return null;
                })}</div>
                <div ref={mergeRefs([drop_bottom, dropZone_L_Banner_Bottom])} className={`banner-L-bottom ${isOver ? 'is-over' : ''}`}>{elements.filter((element) => element.area === 'bottom').map((element, index) => {
                    var top_pos, left_pos
                    if (element.type === ToolTypes.Text) {
                        top_pos = element.y - 20 //substract half of div height
                        left_pos = element.x - 40 // substract half of div width
                        return <div key={index} className="banner-text-element" style={{top: top_pos, left: left_pos,}}>
                            {element.content}{index}
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