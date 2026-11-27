
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

// PRODUCT DATA
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

const categories = [
  { name: 'Laptops', icon: Laptop },
  { name: 'Smartphones', icon: Smartphone },
  { name: 'Watches', icon: Watch },
  { name: 'Audio', icon: Headphones }
];

function HomePage() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(
        localStorage.getItem('alamin-cart') || '[]'
      );

      const count = cart.reduce(
        (sum, item) => sum + Number(item.quantity || 1),
        0
      );

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const addToCart = (product) => {
    const cart = JSON.parse(
      localStorage.getItem('alamin-cart') || '[]'
    );

    const existing = cart.find(
      item => String(item.id) === String(product.id)
    );

    if (existing) {
      existing.quantity = Number(existing.quantity || 1) + 1;
    } else {
      cart.push({
        ...product,
        quantity: 1
      });
    }

    localStorage.setItem('alamin-cart', JSON.stringify(cart));

    const count = cart.reduce(
      (sum, item) => sum + Number(item.quantity || 1),
      0
    );

    setCartCount(count);
  };

  return (
    <div className="site">

      {/* NAVBAR */}
      <nav className="navbar">
        <div
          className="logo"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          ALAMIN<span>.</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#categories">Categories</a>
          <a href="#products">Products</a>
          <a href="#experience">Experience</a>
        </div>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag size={19} />
            <span>Cart</span>
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-nav">
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
        </div>
      )}

      {/* HERO */}
      <section className="hero" id="home">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-tag">
              <span className="pulse-dot"></span>
              THE FUTURE IS HERE
            </div>

            <h1>
              Technology
              <br />
              <span>Beyond Limits.</span>
            </h1>

            <p>
              Discover premium technology, futuristic devices
              and powerful innovations designed for your future.
            </p>

            <div className="hero-buttons">
              <button
                className="primary-btn"
                onClick={() =>
                  document.getElementById('products')?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }
              >
                EXPLORE PRODUCTS
                <ArrowUpRight size={18} />
              </button>

              <button
                className="secondary-btn"
                onClick={() => navigate('/cart')}
              >
                <ShoppingBag size={18} />
                MY CART
              </button>
            </div>

            <div className="hero-stats">
              <div>
                <strong>100%</strong>
                <span>QUALITY FOCUS</span>
              </div>
              <div>
                <strong>24/7</strong>
                <span>ONLINE ACCESS</span>
              </div>
              <div>
                <strong>NEW</strong>
                <span>TECH COLLECTION</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <HeroScene />
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="brand-strip">
        <span>PREMIUM TECHNOLOGY</span>
        <span>FUTURE INNOVATION</span>
        <span>SMART LIFESTYLE</span>
        <span>ALAMIN COLLECTION</span>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section" id="categories">
        <div className="section-heading">
          <span className="eyebrow">EXPLORE COLLECTIONS</span>
          <h2>Shop By Category</h2>
          <p>Find the technology that matches your lifestyle.</p>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                className="category-card"
                key={category.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  document.getElementById('products')?.scrollIntoView({
                    behavior: 'smooth'
                  })
                }
              >
                <Icon size={34} />
                <h3>{category.name}</h3>
                <ArrowUpRight size={18} />
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section" id="products">
        <div className="section-heading">
          <span className="eyebrow">OUR PREMIUM SELECTION</span>
          <h2>Featured Products</h2>
          <p>Discover our latest technology collection.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <motion.div
              className="product-card"
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
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
                <span className="product-category">
                  {product.category}
                </span>
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>

                <div className="product-bottom">
                  <strong>
                    ৳{product.price.toLocaleString('en-IN')}
                  </strong>

                  <button
                    className="add-cart-btn"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingBag size={17} />
                    Add
                  </button>
                </div>

                <button
                  className="view-product-btn"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  VIEW DETAILS
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="experience-section" id="experience">
        <div className="experience-content">
          <span className="eyebrow">THE ALAMIN EXPERIENCE</span>
          <h2>
            Upgrade Your
            <br />
            <span>Digital Lifestyle.</span>
          </h2>
          <p>
            Explore modern technology with a premium shopping
            experience built for the next generation.
          </p>

          <button
            className="primary-btn"
            onClick={() =>
              document.getElementById('products')?.scrollIntoView({
                behavior: 'smooth'
              })
            }
          >
            DISCOVER NOW
            <ArrowUpRight size={18} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-logo">ALAMIN<span>.</span></div>
        <p>THE FUTURE OF TECHNOLOGY</p>
        <div className="footer-bottom">
          © {new Date().getFullYear()} ALAMIN. All rights reserved.
        </div>
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
    </Routes>
  );
}
