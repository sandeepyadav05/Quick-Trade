import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './index.css';
import HomePage from './landing_page/home/HomePage';
import SignUp from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import ProductsPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import Supportpage from './landing_page/support/Supportpage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <BrowserRouter>
 <Navbar />
 <Routes>
  <Route path='/' element={<HomePage/>}></Route>
  <Route path='/signUp' element={<SignUp/>}></Route>
  <Route path='/about' element={<AboutPage/>}></Route>
  <Route path='/products' element={<ProductsPage/>}></Route>
  <Route path='/pricing' element={<PricingPage/>}></Route>
  <Route path='/support' element={<Supportpage/>}></Route>
  <Route path='*' element={<NotFound/>}></Route>
 </Routes>
 <Footer />
 </BrowserRouter>
);
