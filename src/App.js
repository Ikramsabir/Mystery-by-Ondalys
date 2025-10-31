import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import MarineBackground from './MarineBackground';
import Home from './pages/Home';
import Products from './pages/products';
import Login from './pages/login';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Offers from './pages/Offers'
/*

;
import Contact from './pages/Contact';

*/
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <MarineBackground />
        <Navbar />
        <div className="h-28"></div>
        
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route path="/categories" element={<Categories/>}></Route>
            <Route path="/offers" element={<Offers/>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;