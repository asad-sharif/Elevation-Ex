import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomeLayout from './components/HomeLayout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Products from './pages/Products'
import ProductsDetail from './pages/ProductsDetail'
import Gallery from './pages/Gallery'
import PrivacyPolicy from './components/PrivacyPolicy'
import TermsAndConditions from './components/TermsAndConditions'
import Auth from './pages/Auth'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path='gallery' element={<Gallery />} />
          <Route path='products' element={<Products />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='products/:id' element={<ProductsDetail />} />
          <Route path='privacy-policies' element={<PrivacyPolicy />} />
          <Route path='terms-and-conditions' element={<TermsAndConditions />} />

          <Route path='auth' element={<Auth />}>
            <Route index element={<Register />} />
            <Route path='login' element={<Login />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App