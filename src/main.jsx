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
import { MdLightMode, MdDarkMode } from 'react-icons/md';
function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply dark mode class to the <html> element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <StrictMode>
      <AuthProvider>
        <div className={`${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} min-h-screen`}>
          <div className="p-4 flex justify-end">
          <button
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
</button>
          </div>
          <RouterProvider router={router} />
        </div>
      </AuthProvider>
      <ToastContainer />
    </StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<App />);
