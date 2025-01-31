// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import router from './router/router.jsx'
// import { RouterProvider } from 'react-router-dom'
// import AuthProvider from './context/AuthContext/AuthProvider.jsx'
// import { ToastContainer } from 'react-toastify'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <AuthProvider>
//     <RouterProvider router={router} />
//     </AuthProvider>
//     <ToastContainer />
//   </StrictMode>
// )
import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './router/router.jsx';
import { RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthContext/AuthProvider.jsx';
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <StrictMode>
      <AuthProvider>
        <div >
          <div className="p-4 flex justify-end">
          {/* <button
  onClick={toggleDarkMode}
  className="btn btn-primary btn-sm flex items-center text-center"
>
  {isDarkMode ? (
    <>
      <MdLightMode /> Light
    </>
  ) : (
    <>
      <MdDarkMode /> Dark
    </>
  )}
</button> */}
          </div>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
      <ToastContainer />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
