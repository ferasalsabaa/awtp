import React from 'react';
import './ElementsToolbar.css';
import { ToolTypes } from './ToolTypes';
import { useDrag } from 'react-dnd'

export const ElementsToolbar = () => {
	const [{ isDragging : isDraggingText }, drag_text] = useDrag(
		() => ({
			type: ToolTypes.Text,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			item: {
				type: ToolTypes.Text,
			}
		}),
		[],
	)
	const [{ isDragging : isDraggingImage }, drag_image] = useDrag(
		() => ({
			type: ToolTypes.Image,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			item: {
				type: ToolTypes.Image,
			}
		}),
		[],
	)

    return (
		<>
			<h4>Elements Toolbar</h4>
			<div className="tools">
				<div ref={drag_text} className={`tool-text ${isDraggingText ? 'is-dragged' : ''}`}>Text</div>
				<div ref={drag_image} className={`tool-portrait ${isDraggingImage ? 'is-dragged' : ''}`}>Image</div>
			</div>
		</>
	);
}