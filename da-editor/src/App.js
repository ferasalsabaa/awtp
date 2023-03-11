import React from 'react';
import './App.css';
import { MainMenu } from './MainMenu';
import { TemplateArea } from './template-area/TemplateArea';
import { AdArea } from './ad-area/AdArea';

function App() {
  const [appArea, setAppArea] = React.useState(undefined); // 0 -> Template, 1 -> Ads
  
  const renderCurrentStep = () => {
    if (appArea === undefined) {
      return <MainMenu onSelect={setAppArea} />
    }
    if (appArea === 0) {
      return <TemplateArea />
    }
    if (appArea === 1) {
      return <AdArea />
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        Display-Ad Editor
      </header>
      <div className="App-body">
        {renderCurrentStep()}
      </div>
    </div>
  );
}

export default App;
