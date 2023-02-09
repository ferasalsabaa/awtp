import React from 'react';
import './TemplateSelector.css';

export const TemplateSelector = ({ onSelect }) => {
    return (
        <div className='template-select-container'>
            <h2>Welcome to the Display-Ad Editor<br/>Please select a Type of Banner</h2>
            <div className='select-buttons'>
                <button className='fill-div' onClick={() => onSelect(0)}>Standard-Banner</button>
                <button className='fill-div' onClick={() => onSelect(1)}>L-Banner</button>
            </div>
        </div>
    );
}