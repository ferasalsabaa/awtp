import React from 'react';
import './TemplateSelector.css';

export const TemplateSelector = ({ onSelect }) => {
    return (
        <div>
            <h2>Please select a Type of Banner</h2>
            <button onClick={() => onSelect(0)}>Standard-Banner</button>
            <button onClick={() => onSelect(1)}>L-Banner</button>
        </div>
    );
}