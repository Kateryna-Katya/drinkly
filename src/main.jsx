import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "modern-normalize";
import { BrowserRouter } from "react-router-dom";


import './index.css'
import App from './App.jsx'

import Modal from 'react-modal';
Modal.setAppElement('#root');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
    <BrowserRouter>
    <App />
    </BrowserRouter>
   
  </StrictMode>,
)
