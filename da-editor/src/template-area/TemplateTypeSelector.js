import React from 'react';

export const TemplateTypeSelector = ({ onSelect }) => {
    return (
        <div className='template-select-container'>
            <h2>Please select a type for your template</h2>
            <div className='select-buttons'>    
                <button className='fill-div' onClick={() => onSelect(0)}>Standard-Banner</button>
                <button className='fill-div' onClick={() => onSelect(1)}>L-Banner</button>
            </div>
        </div>
    );
}