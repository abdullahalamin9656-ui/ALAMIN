
import React from 'react';
import { motion } from 'framer-motion';
import {
  Search, ShoppingBag, Menu, ArrowRight,
  Smartphone, Laptop, Watch, Headphones,
  Sparkles
} from 'lucide-react';

import HeroScene from './components/3d/HeroScene.jsx';

const products = [
  { name: 'MacBook Pro', type: 'Premium Laptop', price: '$1,999', icon: Laptop },
  { name: 'iPhone Pro', type: 'Smartphone', price: '$1,299', icon: Smartphone },
  { name: 'Ultra Watch', type: 'Smart Watch', price: '$399', icon: Watch },
  { name: 'Gaming Headset', type: 'Audio Gear', price: '$249', icon: Headphones }
];

export default function App() {
  return (
    <main className="site">

      <nav className="navbar">
        <a className="logo" href="#">
          ALA<span>MIN</span><i>.</i>
        </a>

        <div className="navlinks">
          <a href="#">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </div>

        <div className="navactions">
          <Search />
          <ShoppingBag />
          <Menu className="mobile-menu" />
        </div>
      </nav>

      <section className="hero">
        <div className="hero-glow"></div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="eyebrow">
              <Sparkles size={15} /> THE FUTURE IS HERE
            </div>

            <h1>
              TECHNOLOGY<br />
              <span>BEYOND</span><br />
              LIMITS.
            </h1>

            <p>
              Discover the next generation of technology.
              Experience innovation without boundaries.
            </p>

            <a href="#products" className="primary-btn">
              EXPLORE COLLECTION <ArrowRight size={18} />
            </a>
          </motion.div>
        </div>

        <div className="hero-visual">
          <HeroScene />
        </div>

        <div className="hero-bottom">
          <span>SCROLL TO EXPLORE ↓</span>
          <span>PREMIUM TECHNOLOGY STORE</span>
        </div>
      </section>

      <section className="categories" id="categories">
        <div className="section-heading">
          <span>DISCOVER</span>
          <h2>Explore Categories</h2>
        </div>

        <div className="category-grid">
          {products.map((item) => (
            <div className="category-card" key={item.name}>
              <item.icon size={35} />
              <h3>{item.type}</h3>
              <ArrowRight size={17} />
            </div>
          ))}
        </div>
      </section>

      <section className="products" id="products">
        <div className="section-heading">
          <span>CURATED FOR YOU</span>
          <h2>Featured Products</h2>
        </div>

        <div className="product-grid">
          {products.map((item, index) => (
            <motion.article
              className="product-card"
              key={item.name}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <div className="product-image">
                <item.icon size={85} strokeWidth={0.8} />
                <span>NEW ARRIVAL</span>
              </div>

              <div className="product-info">
                <small>{item.type}</small>
                <h3>{item.name}</h3>
                <strong>{item.price}</strong>
                <button>Add to Cart +</button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <footer id="about">
        <a className="logo" href="#">
          ALA<span>MIN</span><i>.</i>
        </a>
        <p>THE FUTURE OF TECHNOLOGY.</p>
        <small>© 2026 ALAMIN. All rights reserved.</small>
      </footer>

    </main>
  );
}
