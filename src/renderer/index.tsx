import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Router>
    <App />
  </Router>
);
