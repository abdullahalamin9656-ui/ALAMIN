
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, MapPin, User, Phone, Truck } from 'lucide-react';

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    district: '',
    area: '',
    address: ''
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('alamin-cart') || '[]');
    setCart(Array.isArray(saved) ? saved : []);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const money = amount => '৳' + amount.toLocaleString('en-BD');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      navigate('/cart');
      return;
    }

    alert('Checkout information saved. Order submission will be connected in the next step.');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050816',
      color: '#fff',
      padding: '25px 5%',
      fontFamily: 'Inter, sans-serif'
    }}>
      <button onClick={() => navigate('/cart')} style={{
        background: 'transparent',
        color: '#00c8ff',
        border: '1px solid #087cff',
        padding: '10px 16px',
        borderRadius: '10px',
        cursor: 'pointer'
      }}>
        <ArrowLeft size={16} /> Back to Cart
      </button>

      <h1 style={{ fontSize: '32px', marginTop: '30px' }}>
        Secure Checkout
      </h1>
      <p style={{ color: '#91a3bd' }}>
        Complete your information to continue your order.
      </p>

      {cart.length === 0 ? (
        <div style={{
          marginTop: '30px',
          padding: '35px',
          background: '#101d36',
          borderRadius: '15px',
          textAlign: 'center'
        }}>
          <ShoppingBag size={45} color="#00c8ff" />
          <h2>Your cart is empty</h2>
          <button onClick={() => navigate('/')} style={buttonStyle}>
            Shop Now
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
          gap: '25px',
          marginTop: '30px'
        }}>
          <form onSubmit={handleSubmit} style={panelStyle}>
            <h2>Delivery Information</h2>

            <label style={labelStyle}>Full Name</label>
            <div style={inputWrap}>
              <User size={18} />
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                style={inputStyle}
              />
            </div>

            <label style={labelStyle}>Mobile Number</label>
            <div style={inputWrap}>
              <Phone size={18} />
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                pattern="01[0-9]{9}"
                title="Enter a valid 11-digit Bangladesh mobile number"
                required
                style={inputStyle}
              />
            </div>

            <label style={labelStyle}>District</label>
            <input
              name="district"
              value={form.district}
              onChange={handleChange}
              placeholder="Your district"
              required
              style={fullInputStyle}
            />

            <label style={labelStyle}>Area / Thana</label>
            <input
              name="area"
              value={form.area}
              onChange={handleChange}
              placeholder="Your area or thana"
              required
              style={fullInputStyle}
            />

            <label style={labelStyle}>Full Delivery Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House, road, village and other details"
              required
              rows="4"
              style={{ ...fullInputStyle, resize: 'vertical' }}
            />

            <button type="submit" style={buttonStyle}>
              CONTINUE TO PLACE ORDER
            </button>
          </form>

          <div style={panelStyle}>
            <h2>Order Summary</h2>

            {cart.map(item => (
              <div key={item.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 0',
                borderBottom: '1px solid #263954'
              }}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '65px',
                    height: '65px',
                    objectFit: 'contain',
                    background: '#fff',
                    borderRadius: '8px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <strong>{item.name || item.title}</strong>
                  <p style={{ color: '#91a3bd', margin: '5px 0' }}>
                    Quantity: {item.quantity || 1}
                  </p>
                </div>
                <strong>{money((Number(item.price) || 0) * (Number(item.quantity) || 1))}</strong>
              </div>
            ))}

            <div style={summaryRow}>
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>

            <div style={summaryRow}>
              <span><Truck size={16} /> Delivery Charge</span>
              <strong>{money(deliveryCharge)}</strong>
            </div>

            <div style={{
              ...summaryRow,
              borderTop: '1px solid #263954',
              paddingTop: '18px',
              fontSize: '20px',
              color: '#00d9ff'
            }}>
              <strong>Total</strong>
              <strong>{money(total)}</strong>
            </div>

            <p style={{
              color: '#91a3bd',
              fontSize: '12px',
              marginTop: '20px'
            }}>
              <MapPin size={14} /> Delivery charge will be confirmed in the next step.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

const panelStyle = {
  background: '#101d36',
  border: '1px solid #203858',
  borderRadius: '16px',
  padding: '22px',
  minWidth: 0
};

const labelStyle = {
  display: 'block',
  marginTop: '18px',
  marginBottom: '8px',
  color: '#c5d5e9',
  fontSize: '14px'
};

const inputWrap = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  background: '#081329',
  border: '1px solid #294365',
  borderRadius: '9px',
  padding: '0 12px',
  color: '#00c8ff'
};

const inputStyle = {
  width: '100%',
  minWidth: 0,
  padding: '13px 0',
  background: 'transparent',
  border: 0,
  outline: 'none',
  color: '#fff',
  fontSize: '14px'
};

const fullInputStyle = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '13px',
  background: '#081329',
  border: '1px solid #294365',
  borderRadius: '9px',
  color: '#fff',
  outline: 'none',
  fontSize: '14px'
};

const summaryRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
  marginTop: '18px'
};

const buttonStyle = {
  width: '100%',
  padding: '15px',
  marginTop: '25px',
  background: 'linear-gradient(90deg,#087cff,#00c8ff)',
  color: '#fff',
  border: 0,
  borderRadius: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
};
