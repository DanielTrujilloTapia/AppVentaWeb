//Clase main
import React from 'react'
import { createRoot } from 'react-dom';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'  


const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
);  