import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './providers'
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from "react-router-dom"
import router from "./constants/router"


createRoot(document.getElementById('root')).render(
    <Providers>
    <RouterProvider router={router}/>


   

    </Providers>
  ,
)
