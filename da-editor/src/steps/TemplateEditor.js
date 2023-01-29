import React from 'react';
import './TemplateEditor.css';
import { BannerTemplate } from './BannerTemplate';
import { ElementsToolbar } from './ElementsToolbar';
import { BannerInputs } from './BannerInputs';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const TemplateEditor = ({ template }) => {
    return (
        <div>
            <h2>Template Editor</h2>
            Selected template: {template}
            <div className='editor'>
                <DndProvider backend={HTML5Backend}>
                <div className='tv-background'></div>
                <div className='banner-overlay'>
                    <BannerTemplate template={template} />
                </div>
                <div className='elements-toolbar'>
                    <ElementsToolbar />
                </div>
                </DndProvider>
            </div>
        </div>
    );
}