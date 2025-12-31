import './index.css' // Import your CSS file
import { RouterProvider } from 'react-router-dom'
import router from './route/index.jsx'
import ReactDOM from 'react-dom/client'
import React from 'react'
ReactDOM.createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router}/>
  
)