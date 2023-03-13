import React from 'react';
import './TemplateSelector.css';

export const TemplateSelector = ({ onSelect }) => {
    const [templates, setTemplates] = React.useState(undefined);

    React.useEffect(() => {
        const uploadUrl = 'http://127.0.0.1:8000/templates'
        const requestMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        };
  
        fetch(uploadUrl, requestMetadata)
        .then(res => res.json())
        .then(templates => setTemplates(templates));
    }, []);

    return (
        <div className='template-select-container'>
            <h2>Please select a template</h2>
            <div className='select-buttons'>
                {templates?.map((templ, index) => (
                    <button key={index} className='fill-div' onClick={() => onSelect(templ)}>
                        {templ.generalInfo.name}
                        <span className='template-type'>{templ.generalInfo.type}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}