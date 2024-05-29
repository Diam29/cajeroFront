import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App.jsx"
import { BrowserRouter } from 'react-router-dom'
// import { ToastProvider } from 'react-hot-toast'
import './main.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <ToastProvider className='toast'> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </ToastProvider> */}
  </React.StrictMode >,
)
