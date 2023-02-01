import React from 'react';
import './TemplateEditor.css';
import { BannerTemplate } from './BannerTemplate';
import { ElementsToolbar } from './ElementsToolbar';
import { BannerInputs } from './BannerInputs';
import { GeneralInputs } from './GeneralInputs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const TemplateEditor = ({ template }) => {
    const [elements, setElements] = React.useState([]);
    return (
        <div>
            <h2>Template Editor</h2>
            Selected template: {template}
            <div className='editor'>
                <DndProvider backend={HTML5Backend}>
                <div className='tv-background'></div>
                <div className='banner-overlay'>
                    <BannerTemplate template={template} elements={elements} setElements={setElements}/>
                </div>
                <div className='elements-toolbar'>
                    <ElementsToolbar />
                </div>
                </DndProvider>
            </div>
            <div className='banner-inputs'>
                <div className='general-info'>
                    <GeneralInputs/>
                </div>
                <div className='individual-info'>
                    <BannerInputs elements={elements}/>
                </div>
                <div className='submit-banner'>
                    <button className='sumbit-banner-button'>Save Banner Instance as JSON</button>
                </div>
            </div>
        </div>
    );
}