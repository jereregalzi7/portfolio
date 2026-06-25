import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.jsx'
import ProjectDetail from './views/ProjectDetail.jsx'
import ProjectDetailSistema from './views/ProjectDetailSistema.jsx'
import ProjectDetailRebrotar from './views/ProjectDetailRebrotar.jsx'
import About from './views/About.jsx'

function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovering(!!e.target.closest("a, button, [role='button']"));
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  const dot = { type: "spring", stiffness: 400, damping: 28, mass: 0.4 };
  const ring = { type: "spring", stiffness: 160, damping: 22, mass: 0.7 };

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-amber-400"
        animate={{ x: pos.x - 4, y: pos.y - 4, scale: hovering ? 0 : 1 }}
        transition={dot}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full border-2 border-amber-400"
        animate={{
          x: pos.x - (hovering ? 20 : 12),
          y: pos.y - (hovering ? 20 : 12),
          width: hovering ? 40 : 24,
          height: hovering ? 40 : 24,
          opacity: hovering ? 0.5 : 0.8,
        }}
        transition={ring}
      />
    </>
  );
}

function AnimatedLayout() {
  const location = useLocation();
  return (
    <>
      <CustomCursor />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -14 }}
          transition={{ duration: 0.28, ease: "easeInOut" }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AnimatedLayout />,
    children: [
      { path: '/', element: <App /> },
      { path: '/proyectos/pirtech', element: <ProjectDetail /> },
      { path: '/proyectos/pirtech-sistema', element: <ProjectDetailSistema /> },
      { path: '/proyectos/rebrotar', element: <ProjectDetailRebrotar /> },
      { path: '/about', element: <About /> },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>,
)
