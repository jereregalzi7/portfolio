import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import ProjectDetail from './views/ProjectDetail.jsx'
import About from './views/About.jsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/proyectos/pirtech', element: <ProjectDetail /> },
  { path: '/about', element: <About /> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
