import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';




ReactDOM.render(
  <StrictMode>
  <App />
</StrictMode>,

  document.getElementById('root')
);


