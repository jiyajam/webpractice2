import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'

// pages & components
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import AddProductPage from './pages/AddProductPage'
import ProductPage from './pages/ProductPage'
import EditProductPage from './pages/EditProductPage'
import NotFoundPage from './pages/NotFoundPage'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/:id' element={<ProductPage />} />
            <Route path='/products/add-product' element={<AddProductPage />} />
            <Route path='/edit-product/:id' element={<EditProductPage />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
