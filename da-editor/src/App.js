import React from 'react';
import './App.css';
import { TemplateSelector } from './steps/TemplateSelector';
import { TemplateEditor } from './steps/TemplateEditor';

function App() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [template, setTemplate] = React.useState();
  const selectTemplate = (templateIndex) => {
    setTemplate(templateIndex);
    setCurrentStep(1);
  }
  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return <TemplateSelector onSelect={selectTemplate} />
    }
    if (currentStep === 1) {
      return <TemplateEditor template={template} />
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        Display-Ad Editor
      </header>
      {renderCurrentStep()}
    </div>
  );
}

export default App;
