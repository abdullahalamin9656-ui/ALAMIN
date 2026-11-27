
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShoppingBag, Trash2, Plus, Minus, ArrowLeft
} from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    setCart(Array.isArray(saved) ? saved : []);
  }, []);

  const saveCart = (updated) => {
    setCart(updated);
    localStorage.setItem('alamin-cart', JSON.stringify(updated));
  };

  const increase = (id) => {
    saveCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: (Number(item.quantity) || 1) + 1 }
        : item
    ));
  };

  const decrease = (id) => {
    saveCart(cart.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, (Number(item.quantity) || 1) - 1) }
        : item
    ));
  };

  const removeItem = (id) => {
    saveCart(cart.filter(item => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const money = amount => '৳' + amount.toLocaleString('en-BD');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050816',
      color: '#fff',
      padding: '25px 5%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <button onClick={() => navigate('/')} style={backStyle}>
        <ArrowLeft size={17} /> Continue Shopping
      </button>

      <h1 style={{ fontSize: '32px', marginTop: '30px' }}>
        My Shopping Cart
      </h1>

      <p style={{ color: '#91a3bd' }}>
        {cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)} item(s) in your cart
      </p>

      {cart.length === 0 ? (
        <div style={emptyStyle}>
          <ShoppingBag size={55} color="#00c8ff" />
          <h2>Your Cart is Empty</h2>
          <p style={{ color: '#91a3bd' }}>
            Add products to continue shopping.
          </p>
          <button onClick={() => navigate('/')} style={mainButton}>
            SHOP NOW
          </button>
        </div>
      ) : (
        <>
          {cart.map(item => (
            <div key={item.id} style={itemStyle}>
              <img
                src={item.image}
                alt={item.name || item.title}
                style={imageStyle}
              />

              <div style={{ flex: 1, minWidth: '130px' }}>
                <h3>{item.name || item.title || 'Product'}</h3>
                <strong style={{ color: '#00d9ff' }}>
                  {money(Number(item.price) || 0)}
                </strong>
              </div>

              <div style={quantityStyle}>
                <button onClick={() => decrease(item.id)} style={smallButton}>
                  <Minus size={16} />
                </button>
                <strong>{item.quantity || 1}</strong>
                <button onClick={() => increase(item.id)} style={smallButton}>
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => removeItem(item.id)}
                style={removeButton}
              >
                <Trash2 size={17} /> Remove
              </button>
            </div>
          ))}

          <div style={summaryStyle}>
            <h2>Order Summary</h2>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Total Amount</span>
              <strong style={{ color: '#00d9ff', fontSize: '25px' }}>
                {money(total)}
              </strong>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              style={mainButton}
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const backStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'transparent',
  color: '#00c8ff',
  border: '1px solid #087cff',
  padding: '10px 16px',
  borderRadius: '10px',
  cursor: 'pointer'
};

const emptyStyle = {
  textAlign: 'center',
  padding: '60px 15px',
  background: '#101d36',
  borderRadius: '18px',
  marginTop: '25px'
};

const itemStyle = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '15px',
  padding: '17px',
  marginTop: '15px',
  background: '#101d36',
  border: '1px solid #203858',
  borderRadius: '15px'
};

const imageStyle = {
  width: '90px',
  height: '90px',
  objectFit: 'contain',
  background: '#fff',
  borderRadius: '10px'
};

const quantityStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px'
};

const smallButton = {
  background: '#17365a',
  color: '#00d9ff',
  border: '1px solid #087cff',
  padding: '9px',
  borderRadius: '8px',
  cursor: 'pointer'
};

const removeButton = {
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  background: '#351725',
  color: '#ff657d',
  border: '1px solid #a52c4c',
  padding: '10px',
  borderRadius: '9px',
  cursor: 'pointer'
};

const summaryStyle = {
  background: '#101d36',
  padding: '22px',
  borderRadius: '15px',
  border: '1px solid #203858',
  marginTop: '25px'
};

const mainButton = {
  width: '100%',
  padding: '15px',
  marginTop: '20px',
  background: 'linear-gradient(90deg,#087cff,#00c8ff)',
  color: '#fff',
  border: 0,
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
};
