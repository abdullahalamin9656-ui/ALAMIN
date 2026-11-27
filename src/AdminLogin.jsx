
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LockKeyhole,
  Mail,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
  Cpu
} from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();

    // Temporary demo navigation.
    // Real secure authentication will be connected later.
    navigate('/admin/dashboard');
  };

  const styles = {
    page: {
      minHeight: '100vh',
      background: '#050816',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, Arial, sans-serif',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden'
    },
    glow: {
      position: 'absolute',
      width: '350px',
      height: '350px',
      borderRadius: '50%',
      background: 'rgba(0, 132, 255, 0.15)',
      filter: 'blur(100px)',
      top: '10%',
      left: '10%'
    },
    card: {
      width: '100%',
      maxWidth: '430px',
      background: 'rgba(13, 24, 43, 0.88)',
      border: '1px solid rgba(0, 174, 255, 0.25)',
      borderRadius: '24px',
      padding: '38px 30px',
      position: 'relative',
      zIndex: 1,
      boxShadow: '0 25px 80px rgba(0,0,0,0.45)',
      backdropFilter: 'blur(20px)'
    },
    logo: {
      width: '65px',
      height: '65px',
      borderRadius: '19px',
      background: 'linear-gradient(135deg, #087cff, #00d9ff)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 20px',
      boxShadow: '0 0 35px rgba(0,140,255,0.35)'
    },
    title: {
      textAlign: 'center',
      fontSize: '30px',
      fontWeight: 900,
      letterSpacing: '3px',
      margin: '0'
    },
    subtitle: {
      textAlign: 'center',
      color: '#8ca5c2',
      fontSize: '13px',
      marginTop: '10px',
      marginBottom: '32px'
    },
    label: {
      display: 'block',
      color: '#c4d5e8',
      fontSize: '13px',
      marginBottom: '9px',
      fontWeight: 600
    },
    inputWrap: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      background: '#091426',
      border: '1px solid #203957',
      borderRadius: '12px',
      padding: '0 15px',
      marginBottom: '22px'
    },
    input: {
      width: '100%',
      height: '52px',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      color: '#fff',
      fontSize: '14px'
    },
    button: {
      width: '100%',
      height: '54px',
      border: 'none',
      borderRadius: '12px',
      background: 'linear-gradient(100deg, #087cff, #00c8ff)',
      color: '#fff',
      fontSize: '15px',
      fontWeight: 800,
      letterSpacing: '1px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '8px'
    },
    security: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '7px',
      color: '#66839f',
      fontSize: '11px',
      marginTop: '25px'
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <motion.div
        style={styles.card}
        initial={{ opacity: 0, y: 35, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div style={styles.logo}>
          <Cpu size={34} color="#fff" />
        </div>

        <h1 style={styles.title}>ALAMIN</h1>
        <p style={styles.subtitle}>
          ADMIN CONTROL CENTER
        </p>

        <form onSubmit={handleLogin}>
          <label style={styles.label}>ADMIN EMAIL</label>

          <div style={styles.inputWrap}>
            <Mail size={19} color="#00bfff" />
            <input
              style={styles.input}
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <label style={styles.label}>PASSWORD</label>

          <div style={styles.inputWrap}>
            <LockKeyhole size={19} color="#00bfff" />
            <input
              style={styles.input}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#8ca5c2',
                cursor: 'pointer',
                padding: 0
              }}
            >
              {showPassword
                ? <EyeOff size={19} />
                : <Eye size={19} />}
            </button>
          </div>

          <button type="submit" style={styles.button}>
            ACCESS DASHBOARD
            <ArrowRight size={19} />
          </button>
        </form>

        <div style={styles.security}>
          <ShieldCheck size={15} color="#00c8ff" />
          ALAMIN ADMIN PANEL
        </div>
      </motion.div>
    </div>
  );
}
