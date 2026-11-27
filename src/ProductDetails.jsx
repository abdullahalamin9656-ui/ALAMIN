

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, ShoppingCart, Minus, Plus,
  ShieldCheck, Truck, RotateCcw
} from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Laptop',
    price: 85000,
    category: 'LAPTOP',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1000&q=90',
    description: 'Powerful performance, premium design and an immersive experience for work, study and creativity.'
  },
  {
    id: 2,
    name: 'Smartphone Pro',
    price: 65000,
    category: 'SMARTPHONE',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1000&q=90',
    description: 'A modern smartphone experience with a sleek design and powerful everyday performance.'
  },
  {
    id: 3,
    name: 'Smart Watch',
    price: 8500,
    category: 'WEARABLE',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&q=90',
    description: 'A stylish smart watch designed for your everyday lifestyle.'
  },
  {
    id: 4,
    name: 'Wireless Headphones',
    price: 4500,
    category: 'AUDIO',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1000&q=90',
    description: 'Enjoy your favourite music with a modern wireless headphone design.'
  }
];

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(item => item.id === Number(id));

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h2>Product Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    cart.push({ ...product, quantity });
    localStorage.setItem('alamin-cart', JSON.stringify(cart));
    alert('Product added to cart!');
  };

  return (
    <main style={styles.page}>
      <header style={styles.header}>
        <button style={styles.back} onClick={() => navigate('/')}>
          <ArrowLeft size={19} /> Back to Store
        </button>
        <strong style={styles.logo}>ALAMIN<span>.</span></strong>
      </header>

      <section style={styles.content}>
        <div style={styles.imageBox}>
          <span style={styles.tag}>PREMIUM COLLECTION</span>
          <img src={product.image} alt={product.name} style={styles.image} />
        </div>

        <div style={styles.info}>
          <small style={styles.category}>{product.category}</small>
          <h1>{product.name}</h1>
          <div style={styles.price}>৳{product.price.toLocaleString('en-BD')}</div>

          <p style={styles.description}>{product.description}</p>

          <div style={styles.quantity}>
            <span>QUANTITY</span>
            <div style={styles.counter}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus size={16} />
              </button>
              <strong>{quantity}</strong>
              <button onClick={() => setQuantity(q => q + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div style={styles.total}>
            Total <strong>৳{(product.price * quantity).toLocaleString('en-BD')}</strong>
          </div>

          <button style={styles.add} onClick={addToCart}>
            <ShoppingCart size={18} /> ADD TO CART
          </button>

          <button style={styles.buy} onClick={addToCart}>
            BUY NOW
          </button>

          <div style={styles.features}>
            <div><Truck size={19} /><span>Delivery available</span></div>
            <div><ShieldCheck size={19} /><span>Secure shopping</span></div>
            <div><RotateCcw size={19} /><span>Support available</span></div>
          </div>
        </div>
      </section>
    </main>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    background: '#050816',
    color: '#f5f8ff',
    fontFamily: 'Inter, sans-serif',
    padding: '0 6% 60px'
  },
  header: {
    height: 75,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '1px solid #ffffff18'
  },
  back: {
    display: 'flex',
    alignItems: 'center',
    gap: 9,
    background: 'transparent',
    border: 0,
    color: '#aabbd6',
    cursor: 'pointer'
  },
  logo: { fontSize: 25, letterSpacing: '-1px' },
  content: {
    maxWidth: 1100,
    margin: '65px auto',
    display: 'grid',
    gridTemplateColumns: '1.1fr .9fr',
    gap: 55,
    alignItems: 'center'
  },
  imageBox: {
    minHeight: 430,
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    background: 'radial-gradient(circle, #173c6b, #0a1428 70%)',
    border: '1px solid #1689ff35',
    borderRadius: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: 430,
    objectFit: 'contain',
    padding: 25
  },
  tag: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 2,
    color: '#55baff',
    fontSize: 10,
    letterSpacing: 2
  },
  info: { minWidth: 0 },
  category: {
    color: '#36aaff',
    letterSpacing: 3,
    fontSize: 11,
    fontWeight: 800
  },
  price: {
    color: '#4db6ff',
    fontSize: 29,
    fontWeight: 800,
    margin: '20px 0'
  },
  description: {
    color: '#9baac4',
    fontSize: 14,
    lineHeight: 1.9
  },
  quantity: {
    marginTop: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#91a4c3',
    fontSize: 11,
    letterSpacing: 1
  },
  counter: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    padding: 8,
    border: '1px solid #ffffff25',
    borderRadius: 6
  },
  total: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '25px 0',
    padding: '18px 0',
    borderTop: '1px solid #ffffff20',
    color: '#9baac4'
  },
  add: {
    width: '100%',
    minHeight: 52,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
    background: '#087cff',
    color: 'white',
    border: 0,
    borderRadius: 5,
    fontWeight: 800,
    cursor: 'pointer'
  },
  buy: {
    width: '100%',
    minHeight: 52,
    marginTop: 12,
    background: 'transparent',
    color: '#55baff',
    border: '1px solid #1689ff',
    borderRadius: 5,
    fontWeight: 800,
    cursor: 'pointer'
  },
  features: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 18,
    marginTop: 28,
    color: '#8fa3c2',
    fontSize: 10
  },
  notFound: {
    minHeight: '100vh',
    background: '#050816',
    color: 'white',
    display: 'grid',
    placeContent: 'center',
    textAlign: 'center'
  }
};
