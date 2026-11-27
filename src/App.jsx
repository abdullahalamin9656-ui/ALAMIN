
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowUpRight, ShoppingBag, Menu, X,
  Laptop, Smartphone, Watch, Headphones
} from 'lucide-react';

import HeroScene from './components/3d/HeroScene.jsx';
import ProductDetails from './ProductDetails.jsx';
import Cart from './Cart.jsx';
import Checkout from './Checkout.jsx';

const products = [
  {
    id: 1,
    name: 'MacBook Pro',
    category: 'LAPTOP',
    price: 249000,
    tag: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85'
  },
  {
    id: 2,
    name: 'iPhone Pro',
    category: 'SMARTPHONE',
    price: 159000,
    tag: 'NEW ARRIVAL',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=85'
  },
  {
    id: 3,
    name: 'Ultra Watch',
    category: 'WEARABLE',
    price: 45000,
    tag: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85'
  },
  {
    id: 4,
    name: 'Studio Headphones',
    category: 'AUDIO',
    price: 28000,
    tag: 'PREMIUM',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85'
  }
];

const categories = [
  { name: 'Laptops', icon: Laptop, number: '01' },
  { name: 'Smartphones', icon: Smartphone, number: '02' },
  { name: 'Smart Watches', icon: Watch, number: '03' },
  { name: 'Audio Devices', icon: Headphones, number: '04' }
];

function HomePage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    const saved = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    setCartCount(
      saved.reduce(
        (sum, item) => sum + (Number(item.quantity) || 1),
        0
      )
    );
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  const addToCart = (item) => {
    const saved = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    const existing = saved.find(p => p.id === item.id);

    const updated = existing
      ? saved.map(p =>
          p.id === item.id
            ? { ...p, quantity: (Number(p.quantity) || 1) + 1 }
            : p
        )
      : [...saved, { ...item, quantity: 1 }];

    localStorage.setItem('alamin-cart', JSON.stringify(updated));
    updateCartCount();
    alert(item.name + ' added to cart!');
  };

  return (
    <div className="site">
      <div className="announcement">
        <span>✦</span> THE FUTURE OF TECHNOLOGY IS HERE
        <span>✦</span>
      </div>

      <nav className="navbar">
        <a href="#home" className="logo">ALA<span>M</span><i>IN</i></a>

        <div className={`navlinks ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </div>

        <div className="navactions">
          <button
            className="cart-button"
            aria-label="Shopping cart"
            onClick={() => navigate('/cart')}
          >
            <ShoppingBag />
            <span>{cartCount}</span>
          </button>

          <button
            className="mobile-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <section className="hero" id="home">
        <div className="hero-glow"></div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="eyebrow">
            <span className="live-dot"></span>
            NEXT GENERATION TECHNOLOGY
          </div>

          <h1>
            ENTER THE<br />
            <span>FUTURE</span><span className="blue-dot">.</span>
          </h1>

          <p>
            Discover extraordinary technology.
            Explore premium devices designed to
            transform the way you experience life.
          </p>

          <div className="hero-buttons">
            <a href="#products" className="primary-btn">
              EXPLORE PRODUCTS <ArrowUpRight size={18} />
            </a>
            <a href="#categories" className="secondary-btn">
              DISCOVER MORE ↗
            </a>
          </div>

          <div className="hero-stats">
            <div><strong>4+</strong><small>PRODUCT CATEGORIES</small></div>
            <div><strong>3D</strong><small>FUTURE EXPERIENCE</small></div>
            <div><strong>24/7</strong><small>ONLINE ACCESS</small></div>
          </div>
        </motion.div>

        <div className="hero-visual">
          <HeroScene />
          <div className="visual-label">
            <strong>ALAMIN / FUTURE DEVICE</strong>
            <small>DESIGNED FOR TOMORROW</small>
          </div>
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE</span>
          <span>EST. 2026 — ALAMIN</span>
        </div>
      </section>

      <div className="brand-strip">
        <span>APPLE</span>
        <span>SAMSUNG</span>
        <span><i>SONY</i></span>
        <span>ASUS</span>
        <span>JBL</span>
      </div>

      <section className="categories" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-kicker">EXPLORE COLLECTIONS</span>
            <h2>SHOP BY <span>CATEGORY</span></h2>
          </div>
          <p>Discover technology that matches your lifestyle.</p>
        </div>

        <div className="category-grid">
          {categories.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                className="category-card"
                key={item.number}
                whileHover={{ y: -8 }}
              >
                <Icon size={42} />
                <span className="category-number">{item.number}</span>
                <h3>{item.name}</h3>
                <ArrowUpRight className="category-arrow" />
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-heading">
          <div>
            <span className="section-kicker">HANDPICKED FOR YOU</span>
            <h2>FEATURED <span>PRODUCTS</span></h2>
          </div>
          <span className="view-all">
            EXPLORE ALL <ArrowUpRight size={16} />
          </span>
        </div>

        <div className="product-grid">
          {products.map((item) => (
            <motion.article
              className="product-card"
              key={item.id}
              whileHover={{ y: -7 }}
            >
              <div
                className="product-image"
                onClick={() => navigate(`/product/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <span className="product-tag">{item.tag}</span>

                <img
                  className="product-photo"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />

                <button
                  className="quick-add"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                >
                  ADD TO CART <ArrowUpRight size={16} />
                </button>
              </div>

              <div
                className="product-info"
                onClick={() => navigate(`/product/${item.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <small>{item.category}</small>
                <h3>{item.name}</h3>
                <strong>৳{item.price.toLocaleString('en-BD')}</strong>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="experience" id="about">
        <div className="experience-glow"></div>
        <span className="section-kicker">WELCOME TO ALAMIN</span>
        <h2>BEYOND THE<br /><span>ORDINARY.</span></h2>
        <p>
          Technology is more than a device.
          It is an experience. Discover your future with ALAMIN.
        </p>
        <a href="#products" className="primary-btn">
          EXPLORE NOW <ArrowUpRight size={18} />
        </a>
      </section>

      <footer>
        <div className="footer-top">
          <a href="#home" className="logo">ALA<span>M</span><i>IN</i></a>
          <p>THE FUTURE OF TECHNOLOGY</p>
        </div>
        <div className="footer-bottom">
          <small>© 2026 ALAMIN. ALL RIGHTS RESERVED.</small>
          <small>DESIGNED FOR THE FUTURE.</small>
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
    </Routes>
  );
}
