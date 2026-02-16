import React from 'react';
import COIDashboard from './components/COIDashboard';
import './index.css';
import { COIProvider } from './context/COIContext';

const App: React.FC = () => {
  return (
    <COIProvider>
      <COIDashboard />
    </COIProvider>
  );
};

export default App;