import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import './App.css'
import SearchPage from './Pages/SearchPage.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/SearchPage" element={<SearchPage />} />
      </Routes>
    </>
  )
}

export default App
