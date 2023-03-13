import React from 'react';
import './MainMenu.css';

export const MainMenu = ({ onSelect }) => {
    return (
        <div className='main-menu-container'>
            <h2>Welcome to the Display-Ad Editor<br/>Please select an option below</h2>
            <div className='select-buttons'>
                <button className='fill-div' onClick={() => onSelect(0)}>Create a new banner template</button>
                <button className='fill-div' onClick={() => onSelect(1)}>Create a banner instance</button>
            </div>
        </div>
    );
}