
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  User,
  MessageCircle,
  Truck
} from 'lucide-react';

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
    const savedCart = JSON.parse(
      localStorage.getItem('alamin-cart') || '[]'
    );
    setCart(savedCart);
  }, []);

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const total = subtotal;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Your cart is empty!');
      navigate('/cart');
      return;
    }

    const order = {
      customer: form,
      items: cart,
      total,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(
      'alamin-pending-order',
      JSON.stringify(order)
    );

    const orderItems = cart.map((item, index) => (
      `${index + 1}. ${item.name || item.title || 'Product'}\n` +
      `Quantity: ${item.quantity || 1}\n` +
      `Price: ৳${Number(item.price || 0).toLocaleString('en-IN')}`
    )).join('\n\n');

    const message = `
🛒 ALAMIN - NEW ORDER

CUSTOMER INFORMATION
Name: ${form.name}
Phone: ${form.phone}
District: ${form.district}
Area: ${form.area}
Address: ${form.address}

ORDER DETAILS
${orderItems}

TOTAL: ৳${total.toLocaleString('en-IN')}

Please confirm my order.
`;

    const whatsappURL =
      'https://wa.me/8801893241507?text=' +
      encodeURIComponent(message);

    window.location.href = whatsappURL;
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#050816',
      color: '#fff',
      padding: '30px 16px 60px',
      fontFamily: 'Inter, Arial, sans-serif'
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '30px'
    },
    back: {
      background: '#101c32',
      border: '1px solid #243c5b',
      color: '#fff',
      padding: '10px',
      borderRadius: '12px'
    },
    title: {
      fontSize: '26px',
      fontWeight: '800',
      margin: 0
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0, 1.5fr) minmax(280px, .9fr)',
      gap: '22px',
      alignItems: 'start'
    },
    card: {
      background: '#0b1426',
      border: '1px solid #1b3150',
      borderRadius: '18px',
      padding: '24px',
      marginBottom: '20px'
    },
    heading: {
      fontSize: '18px',
      margin: '0 0 22px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    label: {
      display: 'block',
      color: '#b8c8dc',
      fontSize: '13px',
      marginBottom: '8px'
    },
    input: {
      width: '100%',
      boxSizing: 'border-box',
      background: '#060e1c',
      border: '1px solid #263d5c',
      borderRadius: '10px',
      padding: '14px',
      color: '#fff',
      fontSize: '14px',
      marginBottom: '17px'
    },
    textarea: {
      width: '100%',
      boxSizing: 'border-box',
      background: '#060e1c',
      border: '1px solid #263d5c',
      borderRadius: '10px',
      padding: '14px',
      color: '#fff',
      minHeight: '100px',
      fontSize: '14px'
    },
    row: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '14px 0',
      borderBottom: '1px solid #20324b',
      fontSize: '14px'
    },
    total: {
      display: 'flex',
      justifyContent: 'space-between',
      color: '#00d9ff',
      fontSize: '20px',
      fontWeight: '800',
      marginTop: '20px',
      paddingTop: '18px',
      borderTop: '1px solid #29415f'
    },
    button: {
      width: '100%',
      border: 'none',
      borderRadius: '12px',
      padding: '17px',
      marginTop: '24px',
      background: 'linear-gradient(110deg, #087cff, #00d9ff)',
      color: '#00101e',
      fontSize: '14px',
      fontWeight: '850',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px'
    },
    note: {
      color: '#8298b5',
      fontSize: '12px',
      lineHeight: '1.7',
      marginTop: '15px'
    }
  };

  if (cart.length === 0) {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.container, textAlign: 'center', paddingTop: '80px' }}>
          <ShoppingBag size={45} />
          <h2>Your Cart Is Empty</h2>
          <button style={styles.button} onClick={() => navigate('/')}>
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>

        <div style={styles.header}>
          <button
            style={styles.back}
            onClick={() => navigate('/cart')}
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 style={styles.title}>CHECKOUT</h1>
            <p style={{ color: '#8fa6c3', fontSize: '13px' }}>
              Complete your order at ALAMIN
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>

            <div style={styles.card}>
              <h2 style={styles.heading}>
                <User color="#00d9ff" />
                Delivery Information
              </h2>

              <label style={styles.label}>Full Name *</label>
              <input
                style={styles.input}
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />

              <label style={styles.label}>Phone Number *</label>
              <input
                style={styles.input}
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="01XXXXXXXXX"
                pattern="01[0-9]{9}"
                required
              />

              <label style={styles.label}>District *</label>
              <input
                style={styles.input}
                name="district"
                value={form.district}
                onChange={handleChange}
                placeholder="Your district"
                required
              />

              <label style={styles.label}>Area / Upazila *</label>
              <input
                style={styles.input}
                name="area"
                value={form.area}
                onChange={handleChange}
                placeholder="Your area"
                required
              />

              <label style={styles.label}>Full Address *</label>
              <textarea
                style={styles.textarea}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="House, road, village and other details"
                required
              />
            </div>

            <div>
              <div style={styles.card}>
                <h2 style={styles.heading}>
                  <ShoppingBag color="#00d9ff" />
                  Your Order
                </h2>

                {cart.map((item, index) => (
                  <div key={item.id || index} style={styles.row}>
                    <div>
                      <strong>
                        {item.name || item.title || 'Product'}
                      </strong>
                      <div style={styles.note}>
                        Quantity: {item.quantity || 1}
                      </div>
                    </div>

                    <strong>
                      ৳{(
                        Number(item.price || 0) *
                        Number(item.quantity || 1)
                      ).toLocaleString('en-IN')}
                    </strong>
                  </div>
                ))}

                <div style={styles.row}>
                  <span>Subtotal</span>
                  <strong>৳{subtotal.toLocaleString('en-IN')}</strong>
                </div>

                <div style={styles.row}>
                  <span>Delivery</span>
                  <strong>To be confirmed</strong>
                </div>

                <div style={styles.total}>
                  <span>Total</span>
                  <span>৳{total.toLocaleString('en-IN')}</span>
                </div>

                <button type="submit" style={styles.button}>
                  <MessageCircle size={19} />
                  ORDER VIA WHATSAPP
                </button>

                <p style={styles.note}>
                  WhatsApp will open with your order details.
                  Press Send in WhatsApp to submit your order.
                  After returning, you can view the order success page.
                </p>
              </div>

              <div style={styles.card}>
                <h3 style={styles.heading}>
                  <Truck color="#00d9ff" />
                  Delivery Support
                </h3>
                <p style={styles.note}>
                  Our team will contact you to confirm your
                  order and delivery information.
                </p>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
