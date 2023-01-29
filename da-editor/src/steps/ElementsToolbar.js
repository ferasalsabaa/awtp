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
	const [{ isDragging : isDraggingPortrait }, drag_portrait] = useDrag(
		() => ({
			type: ToolTypes.Portrait,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			item: {
				type: ToolTypes.Portrait,
			}
		}),
		[],
	)
	const [{ isDragging : isDraggingLandscape }, drag_landscape] = useDrag(
		() => ({
			type: ToolTypes.Landscape,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			item: {
				type: ToolTypes.Landscape,
			}
		}),
		[],
	)
	const [{ isDragging : isDraggingSkyscraper }, drag_skyscraper] = useDrag(
		() => ({
			type: ToolTypes.Skyscraper,
			collect: (monitor) => ({
				isDragging: !!monitor.isDragging(),
			}),
			item: {
				type: ToolTypes.Skyscraper,
			}
		}),
		[],
	)

    return (
		<>
			<h4>Elements Toolbar</h4>
			<div className="tools">
				<div ref={drag_text} className={`tool-text ${isDraggingText ? 'is-dragged' : ''}`}>Text</div>
				<div ref={drag_portrait} className={`tool-portrait ${isDraggingPortrait ? 'is-dragged' : ''}`}>Portrait-Image</div>
				<div ref={drag_landscape} className={`tool-landscape ${isDraggingLandscape ? 'is-dragged' : ''}`}>Landscape-Image</div>
				<div ref={drag_skyscraper} className={`tool-skyscraper ${isDraggingSkyscraper ? 'is-dragged' : ''}`}>Skyscraper-Image</div>
			</div>
		</>
	);
}