import React from 'react';
import { TemplateTypeSelector } from './TemplateTypeSelector';
import { TemplateEditor } from './TemplateEditor';

export const TemplateArea = () => {
    const [templateType, setTemplateType] = React.useState(undefined);
  
    if (templateType === undefined) {
        return <TemplateTypeSelector onSelect={setTemplateType} />
    }

    return <TemplateEditor templateType={templateType} />
}