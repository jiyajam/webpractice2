import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Navbar from './components/Navbar'
import Home from './pages/HomePage'
import AddProductPage from './pages/AddProductPage'
import ProductPage from './pages/ProductPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <div className='content'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products/add-product' element={<AddProductPage />} />
            <Route path='/products/:id' element={<ProductPage />} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
