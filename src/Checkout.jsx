
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
      sum +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  const total = subtotal;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
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
      total: total,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(
      'alamin-pending-order',
      JSON.stringify(order)
    );

    const orderItems = cart.map((item, index) => {
      return (
        `${index + 1}. ${item.name || item.title || 'Product'}\n` +
        `Quantity: ${item.quantity || 1}\n` +
        `Price: ৳${Number(item.price || 0).toLocaleString('en-IN')}`
      );
    }).join('\n\n');

    const message = `
🛒 ALAMIN - NEW ORDER

👤 CUSTOMER INFORMATION

Name: ${form.name}
Phone: ${form.phone}
District: ${form.district}
Area: ${form.area}
Address: ${form.address}

📦 ORDER DETAILS

${orderItems}

💰 SUBTOTAL: ৳${subtotal.toLocaleString('en-IN')}
🚚 DELIVERY: To be confirmed
💵 TOTAL: ৳${total.toLocaleString('en-IN')}

Please confirm my order.

Thank you for shopping with ALAMIN.
`;

    const whatsappURL =
      'https://wa.me/8801893241507?text=' +
      encodeURIComponent(message);

    // Open WhatsApp
    window.open(whatsappURL, '_blank');

    // Open Success Page in current tab
    navigate('/success');
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
      borderRadius: '12px',
      cursor: 'pointer'
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
      fontWeight: '750',
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
      outline: 'none',
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
      outline: 'none',
      fontSize: '14px',
      minHeight: '100px',
      resize: 'vertical'
    },

    item: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: '12px',
      padding: '14px 0',
      borderBottom: '1px solid #20324b',
      fontSize: '14px'
    },

    muted: {
      color: '#8fa6c3',
      fontSize: '12px',
      marginTop: '6px'
    },

    totalRow: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '16px',
      color: '#b8c8dc',
      fontSize: '14px'
    },

    grandTotal: {
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      paddingTop: '18px',
      borderTop: '1px solid #29415f',
      fontSize: '20px',
      fontWeight: '800',
      color: '#00d9ff'
    },

    submit: {
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
        <div style={styles.container}>
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <ShoppingBag size={48} />
            <h2>Your Cart Is Empty</h2>
            <p style={styles.note}>
              Add products before checkout.
            </p>

            <button
              style={styles.submit}
              onClick={() => navigate('/')}
            >
              CONTINUE SHOPPING
            </button>
          </div>
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
            type="button"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <h1 style={styles.title}>CHECKOUT</h1>
            <p style={styles.muted}>
              Complete your order at ALAMIN
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.grid}>

            {/* CUSTOMER INFORMATION */}
            <div style={styles.card}>
              <h2 style={styles.heading}>
                <User color="#00d9ff" size={20} />
                Delivery Information
              </h2>

              <label style={styles.label}>
                Full Name *
              </label>

              <input
                style={styles.input}
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>
                Phone Number *
              </label>

              <input
                style={styles.input}
                type="tel"
                name="phone"
                placeholder="01XXXXXXXXX"
                pattern="01[0-9]{9}"
                value={form.phone}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>
                District *
              </label>

              <input
                style={styles.input}
                type="text"
                name="district"
                placeholder="Your district"
                value={form.district}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>
                Area / Upazila *
              </label>

              <input
                style={styles.input}
                type="text"
                name="area"
                placeholder="Your area or upazila"
                value={form.area}
                onChange={handleChange}
                required
              />

              <label style={styles.label}>
                Full Delivery Address *
              </label>

              <textarea
                style={styles.textarea}
                name="address"
                placeholder="House, road, village and other details"
                value={form.address}
                onChange={handleChange}
                required
              />
            </div>

            {/* ORDER SUMMARY */}
            <div>
              <div style={styles.card}>
                <h2 style={styles.heading}>
                  <ShoppingBag color="#00d9ff" size={20} />
                  Your Order
                </h2>

                {cart.map((item, index) => (
                  <div
                    key={item.id || index}
                    style={styles.item}
                  >
                    <div>
                      <strong>
                        {item.name || item.title || 'Product'}
                      </strong>

                      <div style={styles.muted}>
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

                <div style={styles.totalRow}>
                  <span>Subtotal</span>
                  <strong>
                    ৳{subtotal.toLocaleString('en-IN')}
                  </strong>
                </div>

                <div style={styles.totalRow}>
                  <span>Delivery Charge</span>
                  <strong>To be confirmed</strong>
                </div>

                <div style={styles.grandTotal}>
                  <span>Total</span>
                  <span>
                    ৳{total.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  style={styles.submit}
                >
                  <MessageCircle size={19} />
                  ORDER VIA WHATSAPP
                </button>

                <p style={styles.note}>
                  WhatsApp will open with your order details.
                  Press Send in WhatsApp to submit your order.
                  The website will then display the order
                  success page.
                </p>
              </div>

              <div style={styles.card}>
                <h3 style={styles.heading}>
                  <Truck color="#00d9ff" size={20} />
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
