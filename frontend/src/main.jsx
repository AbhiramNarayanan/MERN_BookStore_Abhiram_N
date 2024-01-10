import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";

//after installing vite and tailwind css and texting with above written comment now we need single page application (spa)
  //but by default react dont have that so we need to install a package npm i react-router-dom then we need to add some configuration
  //go to main.jsx and import BrowserRouter from react-router-dom (replace i mean dlt React.StrictMode in that place we are using the BrowserRouter)and place the app component as a child in BrowserRouter
  //now we have access to react-router-dom on all our projects



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
