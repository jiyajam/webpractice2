import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom'

// pages & components
import MainLayout from './layouts/MainLayout'
import Home from './pages/HomePage'
import AddProductPage from './pages/AddProductPage'
import ProductPage from './pages/ProductPage'
import EditProductPage from './pages/EditProductPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path='/products/add-product' element={<AddProductPage />} />
        <Route path='/edit-product/:id' element={<EditProductPage />} />
        <Route path='/products/:id' element={<ProductPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App
