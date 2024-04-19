import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import './App.css'
import SearchPage from './Pages/SearchPage.jsx'
import AdminPage from './Pages/AdminPage.jsx'
import { ToastContainer } from 'react-toastify';
import { ToasterProvider } from './Context/Toaster.context.jsx'

function App() {

  return (
    <>
        <ToasterProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/SearchPage" element={<SearchPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </ToasterProvider>

      <ToastContainer position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
    </>
  )
}

export default App
