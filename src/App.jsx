
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  ShoppingBag,
  Menu,
  X,
  Laptop,
  Smartphone,
  Watch,
  Headphones
} from 'lucide-react';

import HeroScene from './components/3d/HeroScene.jsx';
import ProductDetails from './ProductDetails.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';
import OrderSuccess from './OrderSuccess.jsx';
import AdminLogin from './AdminLogin.jsx';
import AdminDashboard from './AdminDashboard.jsx';

const products = [
  {
    id: 1,
    name: 'MacBook Pro',
    category: 'LAPTOP',
    price: 249000,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900'
  },
  {
    id: 2,
    name: 'iPhone Pro',
    category: 'SMARTPHONE',
    price: 159000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900'
  },
  {
    id: 3,
    name: 'Ultra Watch',
    category: 'WEARABLE',
    price: 45000,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900'
  },
  {
    id: 4,
    name: 'Studio Headphones',
    category: 'AUDIO',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900'
  }
];

function HomePage() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
      setCartCount(
        cart.reduce((total, item) => total + (item.quantity || 1), 0)
      );
    };

    updateCart();
    window.addEventListener('storage', updateCart);

    return () => window.removeEventListener('storage', updateCart);
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('alamin-cart', JSON.stringify(cart));

    setCartCount(
      cart.reduce((total, item) => total + (item.quantity || 1), 0)
    );
  };

  const categories = [
    { name: 'Laptops', icon: Laptop },
    { name: 'Smartphones', icon: Smartphone },
    { name: 'Watches', icon: Watch },
    { name: 'Audio', icon: Headphones }
  ];

  return (
    <div className="site">
      <nav className="navbar">
        <div className="nav-logo" onClick={() => navigate('/')}>
          ALAMIN<span>.</span>
        </div>

        <div className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
        </div>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag size={20} />
            <span>{cartCount}</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-content">
          <motion.p
            className="hero-tag"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            THE FUTURE IS HERE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            TECHNOLOGY
            <br />
            <span>REDEFINED.</span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Discover premium technology designed for your future.
            Explore the next generation of innovation.
          </motion.p>

          <motion.button
            className="primary-button"
            onClick={() => navigate('/product/1')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE COLLECTION <ArrowUpRight size={18} />
          </motion.button>
        </div>

        <div className="hero-visual">
          <HeroScene />
        </div>
      </section>

      <section className="brand-strip">
        <span>PREMIUM QUALITY</span>
        <span>FUTURE TECHNOLOGY</span>
        <span>INNOVATION FIRST</span>
        <span>ALAMIN EXCLUSIVE</span>
      </section>

      <section className="categories-section" id="categories">
        <div className="section-heading">
          <p>EXPLORE BY CATEGORY</p>
          <h2>Find Your <span>Technology</span></h2>
        </div>

        <div className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div className="category-card" key={category.name}>
                <Icon size={32} />
                <h3>{category.name}</h3>
                <ArrowUpRight size={18} />
              </div>
            );
          })}
        </div>
      </section>

      <section className="products-section" id="products">
        <div className="section-heading">
          <p>OUR COLLECTION</p>
          <h2>Featured <span>Products</span></h2>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <motion.div
              className="product-card"
              key={product.id}
              whileHover={{ y: -8 }}
            >
              <div
                className="product-image"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <img
                  className="product-photo"
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="product-info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>
                    ৳{product.price.toLocaleString('en-BD')}
                  </strong>

                  <button
                    onClick={() => addToCart(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>

                <button
                  className="view-product"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  VIEW DETAILS <ArrowUpRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="experience-section" id="experience">
        <div>
          <p>THE ALAMIN EXPERIENCE</p>
          <h2>Beyond Ordinary.<br /><span>Into The Future.</span></h2>
          <p>
            Experience a new standard of technology, quality and innovation.
          </p>
        </div>
      </section>

      <footer className="footer">
        <h2>ALAMIN<span>.</span></h2>
        <p>Technology for the next generation.</p>
        <p>© {new Date().getFullYear()} ALAMIN. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/success" element={<OrderSuccess />} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
