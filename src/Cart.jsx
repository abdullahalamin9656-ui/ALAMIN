
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    setCart(Array.isArray(savedCart) ? savedCart : []);
  }, []);

  const saveCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('alamin-cart', JSON.stringify(updatedCart));
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
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const money = (amount) =>
    '৳' + Number(amount).toLocaleString('en-IN');

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050816',
      color: '#fff',
      padding: '25px 5%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <button onClick={() => navigate('/')} style={{
        background: 'transparent',
        color: '#00c8ff',
        border: '1px solid #087cff',
        padding: '10px 16px',
        borderRadius: '10px',
        cursor: 'pointer'
      }}>
        <ArrowLeft size={16} style={{ verticalAlign: 'middle' }} /> Continue Shopping
      </button>

      <h1 style={{ fontSize: '32px', marginTop: '30px' }}>
        My Shopping Cart
      </h1>

      <p style={{ color: '#8da4c0' }}>
        {cart.length} product(s) in your cart
      </p>

      {cart.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '70px 15px',
          background: '#0d1830',
          borderRadius: '18px',
          marginTop: '25px'
        }}>
          <ShoppingBag size={55} color="#00c8ff" />
          <h2>Your Cart is Empty</h2>
          <p style={{ color: '#91a3bd' }}>
            Add some products to your shopping cart.
          </p>
          <button onClick={() => navigate('/')} style={{
            background: '#087cff',
            color: '#fff',
            padding: '13px 25px',
            border: 0,
            borderRadius: '10px',
            marginTop: '15px',
            cursor: 'pointer'
          }}>
            Shop Now
          </button>
        </div>
      ) : (
        <>
          <div style={{ marginTop: '25px' }}>
            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                padding: '17px',
                marginBottom: '15px',
                background: '#101d36',
                border: '1px solid #203858',
                borderRadius: '15px',
                flexWrap: 'wrap'
              }}>
                <img
                  src={item.image}
                  alt={item.name || item.title || 'Product'}
                  style={{
                    width: '95px',
                    height: '95px',
                    objectFit: 'contain',
                    background: '#fff',
                    borderRadius: '10px'
                  }}
                />

                <div style={{ flex: 1, minWidth: '130px' }}>
                  <h3 style={{ margin: '0 0 8px' }}>
                    {item.name || item.title || 'Product'}
                  </h3>
                  <strong style={{ color: '#00d9ff' }}>
                    {money(item.price)}
                  </strong>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <button onClick={() => decrease(item.id)}>
                    <Minus size={17} />
                  </button>
                  <strong>{item.quantity || 1}</strong>
                  <button onClick={() => increase(item.id)}>
                    <Plus size={17} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    background: '#351725',
                    color: '#ff657d',
                    border: '1px solid #a52c4c',
                    padding: '10px',
                    borderRadius: '9px',
                    cursor: 'pointer'
                  }}
                >
                  <Trash2 size={18} /> Remove
                </button>
              </div>
            ))}
          </div>

          <div style={{
            background: '#101d36',
            padding: '22px',
            borderRadius: '15px',
            border: '1px solid #203858',
            marginTop: '25px'
          }}>
            <h2 style={{ margin: 0 }}>Order Summary</h2>
            <h3 style={{ color: '#00d9ff', fontSize: '25px' }}>
              Total: {money(total)}
            </h3>
            <button
              onClick={() => alert('Checkout will be added in the next step.')}
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(90deg,#087cff,#00c8ff)',
                color: '#fff',
                border: 0,
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
