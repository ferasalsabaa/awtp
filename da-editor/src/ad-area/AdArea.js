import React from 'react';
import { TemplateSelector } from './TemplateSelector';
import { AdEditor } from './AdEditor';

export const AdArea = () => {
  const [selectedTemplate, selectTemplate] = React.useState(undefined);
  
  if (selectedTemplate === undefined) {
    return <TemplateSelector onSelect={selectTemplate} />
  }
  return <AdEditor template={selectedTemplate} />
}
