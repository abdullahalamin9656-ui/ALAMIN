
import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function OrderSuccess() {
  const navigate = useNavigate();

  const styles = {
    page: {
      minHeight: '100vh',
      background: 'radial-gradient(circle at top, #10264a, #050816 60%)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '25px 16px',
      fontFamily: 'Inter, Arial, sans-serif'
    },
    card: {
      width: '100%',
      maxWidth: '520px',
      textAlign: 'center',
      background: 'rgba(12, 25, 46, 0.94)',
      border: '1px solid #24476a',
      borderRadius: '25px',
      padding: '40px 25px',
      boxShadow: '0 25px 80px rgba(0, 0, 0, 0.45)'
    },
    icon: {
      width: '95px',
      height: '95px',
      margin: '0 auto 25px',
      borderRadius: '50%',
      background: 'rgba(0, 217, 255, 0.10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 40px rgba(0, 217, 255, 0.15)'
    },
    title: {
      fontSize: '30px',
      fontWeight: '900',
      margin: '0 0 12px',
      background: 'linear-gradient(90deg, #fff, #00d9ff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    description: {
      color: '#a9bbd3',
      lineHeight: '1.8',
      fontSize: '14px',
      marginBottom: '25px'
    },
    notice: {
      background: '#101f35',
      border: '1px solid #294361',
      borderRadius: '14px',
      padding: '16px',
      color: '#c9d8e9',
      fontSize: '13px',
      lineHeight: '1.7',
      marginBottom: '25px'
    },
    button: {
      width: '100%',
      padding: '16px',
      border: 'none',
      borderRadius: '12px',
      background: 'linear-gradient(100deg, #087cff, #00d9ff)',
      color: '#03101e',
      fontSize: '14px',
      fontWeight: '900',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '12px'
    },
    secondary: {
      width: '100%',
      padding: '15px',
      border: '1px solid #315071',
      borderRadius: '12px',
      background: 'transparent',
      color: '#fff',
      fontSize: '14px',
      fontWeight: '750',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '10px'
    },
    footer: {
      color: '#7088a7',
      fontSize: '11px',
      marginTop: '28px',
      letterSpacing: '2px'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>

        <div style={styles.icon}>
          <CheckCircle2 size={62} color="#00d9ff" />
        </div>

        <h1 style={styles.title}>
          THANK YOU!
        </h1>

        <h2 style={{ fontSize: '19px', margin: '0 0 15px' }}>
          Your Order Request Is Ready
        </h2>

        <p style={styles.description}>
          Thank you for choosing ALAMIN.
          Your WhatsApp order request has been prepared.
          Please make sure you have sent the message to our team.
        </p>

        <div style={styles.notice}>
          <ShieldCheck
            size={22}
            color="#00d9ff"
            style={{ verticalAlign: 'middle', marginRight: '8px' }}
          />
          <strong>Order Confirmation</strong>
          <br />
          Our team will contact you to confirm your order
          and delivery information.
        </div>

        <button
          style={styles.button}
          onClick={() => navigate('/')}
        >
          <ShoppingBag size={19} />
          CONTINUE SHOPPING
          <ArrowRight size={18} />
        </button>

        <button
          style={styles.secondary}
          onClick={() =>
            window.open(
              'https://wa.me/8801893241507',
              '_blank'
            )
          }
        >
          <MessageCircle size={19} />
          CONTACT ALAMIN
        </button>

        <div style={styles.footer}>
          ALAMIN · FUTURE OF TECHNOLOGY
        </div>

      </div>
    </div>
  );
}
