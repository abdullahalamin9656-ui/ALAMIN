
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search, ShoppingBag, Menu, ArrowUpRight,
  Smartphone, Laptop, Watch, Headphones,
  Gamepad2, ArrowRight, Sparkles, X
} from 'lucide-react';
import HeroScene from './components/3d/HeroScene.jsx';

const products = [
  {
    id: 1,
    name: 'MacBook Pro',
    type: 'PRO LAPTOP',
    price: '৳ 2,49,000',
    icon: Laptop,
    tag: 'BEST SELLER',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=900&q=85'
  },
  {
    id: 2,
    name: 'iPhone Pro',
    type: 'SMARTPHONE',
    price: '৳ 1,59,000',
    icon: Smartphone,
    tag: 'NEW ARRIVAL',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=900&q=85'
  },
  {
    id: 3,
    name: 'Ultra Watch',
    type: 'SMART WATCH',
    price: '৳ 45,000',
    icon: Watch,
    tag: 'POPULAR',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=85'
  },
  {
    id: 4,
    name: 'Studio Headphones',
    type: 'PREMIUM AUDIO',
    price: '৳ 28,000',
    icon: Headphones,
    tag: 'FEATURED',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900&q=85'
  }
];

const categories = [
  { name: 'Smartphones', icon: Smartphone, number: '01' },
  { name: 'Laptops', icon: Laptop, number: '02' },
  { name: 'Smart Watches', icon: Watch, number: '03' },
  { name: 'Gaming', icon: Gamepad2, number: '04' }
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  return (
    <main className="site">

      <div className="announcement">
        <Sparkles size={13} />
        <span>WELCOME TO THE FUTURE — DISCOVER ALAMIN</span>
        <ArrowRight size={13} />
      </div>

      <nav className="navbar">
        <a className="logo" href="#">
          ALA<span>MIN</span><i>.</i>
        </a>

        <div className={`navlinks ${menuOpen ? 'nav-open' : ''}`}>
          <a href="#" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#products" onClick={() => setMenuOpen(false)}>Collection</a>
          <a href="#categories" onClick={() => setMenuOpen(false)}>Categories</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </div>

        <div className="navactions">
          <button aria-label="Search"><Search /></button>
          <button aria-label="Shopping cart" className="cart-button">
            <ShoppingBag />
            <span>{cart.length}</span>
          </button>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 45 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="eyebrow">
              <span className="live-dot"></span>
              NEXT GENERATION TECHNOLOGY
            </div>

            <h1>
              THE FUTURE<br />
              IS <span>IN YOUR</span><br />
              HANDS<span className="blue-dot">.</span>
            </h1>

            <p>
              Explore extraordinary technology.
              Discover innovation designed to move
              your world forward.
            </p>

            <div className="hero-buttons">
              <a href="#products" className="primary-btn">
                EXPLORE COLLECTION <ArrowUpRight size={18} />
              </a>
              <a href="#about" className="secondary-btn">
                DISCOVER ALAMIN
              </a>
            </div>

            <div className="hero-stats">
              <div><strong>01</strong><small>INNOVATION</small></div>
              <div><strong>∞</strong><small>POSSIBILITIES</small></div>
              <div><strong>100%</strong><small>FUTURE READY</small></div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3 }}
        >
          <HeroScene />
          <div className="visual-label">
            <span>ALAMIN / 001</span>
            <small>THE FUTURE COLLECTION</small>
          </div>
        </motion.div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE ↓</span>
          <span>DESIGNED FOR TOMORROW</span>
        </div>
      </section>

      <section className="brand-strip">
        <span>INNOVATION</span><i>✦</i>
        <span>TECHNOLOGY</span><i>✦</i>
        <span>EXPERIENCE</span><i>✦</i>
        <span>ALAMIN</span>
      </section>

      <section className="categories" id="categories">
        <div className="section-heading">
          <div>
            <span className="section-kicker">EXPLORE THE WORLD</span>
            <h2>Find Your <span>Technology.</span></h2>
          </div>
          <p>Everything you need.<br />All in one destination.</p>
        </div>

        <div className="category-grid">
          {categories.map((item, index) => (
            <motion.a
              href="#products"
              className="category-card"
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ y: -9 }}
            >
              <span className="category-number">{item.number}</span>
              <item.icon size={42} strokeWidth={1.1} />
              <h3>{item.name}</h3>
              <ArrowUpRight size={19} className="category-arrow" />
            </motion.a>
          ))}
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-heading">
          <div>
            <span className="section-kicker">HANDPICKED FOR YOU</span>
            <h2>Featured <span>Collection.</span></h2>
          </div>
          <a href="#products" className="view-all">
            VIEW ALL <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="product-grid">
          {products.map((item, index) => (
            <motion.article
              className="product-card"
              key={item.id}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.13 }}
              whileHover={{ y: -10 }}
            >
              <div className="product-image">
                <span className="product-tag">{item.tag}</span>

                <img
                  className="product-photo"
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                />

                <button
                  className="quick-add"
                  onClick={() => setCart(current => [...current, item])}
                >
                  ADD TO CART <ArrowUpRight size={16} />
                </button>
              </div>

              <div className="product-info">
                <small>{item.type}</small>
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="experience" id="about">
        <div className="experience-glow"></div>
        <span className="section-kicker">MORE THAN TECHNOLOGY</span>
        <h2>Experience<br /><span>What’s Next.</span></h2>
        <p>
          A new dimension of technology.
          A new standard of experience.
          Welcome to ALAMIN.
        </p>
        <a href="#products" className="primary-btn">
          ENTER THE FUTURE <ArrowUpRight size={18} />
        </a>
      </section>

      <footer>
        <div className="footer-top">
          <a className="logo" href="#">ALA<span>MIN</span><i>.</i></a>
          <p>TECHNOLOGY BEYOND LIMITS.</p>
        </div>
        <div className="footer-bottom">
          <small>© 2026 ALAMIN. ALL RIGHTS RESERVED.</small>
          <small>BUILT FOR THE FUTURE.</small>
        </div>
      </footer>

    </main>
  );
}
