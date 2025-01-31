import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "modern-normalize";
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider >
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
