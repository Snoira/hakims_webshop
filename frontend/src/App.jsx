import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Pages/HomePage.jsx'
import CheckoutPage from './Pages/CheckoutPage.jsx'
import './App.css'

function App() {

  return (
    <>
      <h1>test</h1>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/checkout" element={<CheckoutPage/>} />
      </Routes>
    </>
  )
}

export default App
