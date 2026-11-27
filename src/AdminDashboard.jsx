
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  DollarSign,
  Settings,
  LogOut,
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const stats = [
    { title: 'TOTAL SALES', value: '৳0', icon: DollarSign, color: '#00d9ff' },
    { title: 'TOTAL ORDERS', value: '0', icon: ShoppingBag, color: '#8b7cff' },
    { title: 'TOTAL PRODUCTS', value: '4', icon: Package, color: '#00e6a8' },
    { title: 'TOTAL CUSTOMERS', value: '0', icon: Users, color: '#ffb547' }
  ];

  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Products', icon: Package },
    { name: 'Orders', icon: ShoppingBag },
    { name: 'Customers', icon: Users },
    { name: 'Settings', icon: Settings }
  ];

  const card = {
    background: '#101d31',
    border: '1px solid #20334c',
    borderRadius: '16px',
    padding: '20px'
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050b17',
      color: '#fff',
      fontFamily: 'Inter, Arial, sans-serif',
      display: 'flex'
    }}>
      <aside style={{
        width: '235px',
        background: '#091426',
        borderRight: '1px solid #1b3049',
        padding: '25px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px'
      }}>
        <h2 style={{
          margin: 0,
          textAlign: 'center',
          letterSpacing: '4px',
          color: '#00c8ff'
        }}>
          ALAMIN
        </h2>

        <div>
          {menu.map((item, index) => {
            const Icon = item.icon;

            return (
              <div key={item.name} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '13px',
                padding: '14px',
                marginBottom: '7px',
                borderRadius: '10px',
                background: index === 0 ? '#12345a' : 'transparent',
                color: index === 0 ? '#00d9ff' : '#9aadc4',
                fontSize: '14px',
                cursor: 'pointer'
              }}>
                <Icon size={19} />
                {item.name}
              </div>
            );
          })}
        </div>

        <button
          onClick={() => navigate('/admin')}
          style={{
            marginTop: 'auto',
            padding: '13px',
            background: '#17263a',
            color: '#ff7185',
            border: '1px solid #293d55',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '9px',
            cursor: 'pointer'
          }}
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      <main style={{
        flex: 1,
        padding: '30px',
        minWidth: 0
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '30px'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '27px' }}>
              Dashboard
            </h1>
            <p style={{ color: '#8297b2', fontSize: '13px' }}>
              Welcome to ALAMIN Control Center
            </p>
          </div>

          <div style={{
            background: '#10243a',
            border: '1px solid #24415e',
            padding: '11px 16px',
            borderRadius: '10px',
            color: '#00d9ff',
            fontSize: '12px'
          }}>
            ADMIN PANEL
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}>
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                style={card}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{
                    color: '#8da3bd',
                    fontSize: '11px',
                    fontWeight: 700
                  }}>
                    {item.title}
                  </span>

                  <Icon size={22} color={item.color} />
                </div>

                <h2 style={{
                  fontSize: '27px',
                  margin: '22px 0 5px'
                }}>
                  {item.value}
                </h2>

                <span style={{
                  color: '#6f879f',
                  fontSize: '11px'
                }}>
                  Store overview
                </span>
              </motion.div>
            );
          })}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '18px',
          marginTop: '25px'
        }}>
          <div style={card}>
            <TrendingUp color="#00d9ff" size={25} />
            <h3>Sales Overview</h3>
            <p style={{ color: '#8297b2', fontSize: '13px' }}>
              Your sales analytics will appear here after database connection.
            </p>
          </div>

          <div style={card}>
            <Clock color="#ffb547" size={25} />
            <h3>Recent Orders</h3>
            <p style={{ color: '#8297b2', fontSize: '13px' }}>
              No order records connected yet.
            </p>
          </div>
        </div>

        <div style={{
          ...card,
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px',
          flexWrap: 'wrap'
        }}>
          <div>
            <h3 style={{ margin: '0 0 8px' }}>Manage Your Store</h3>
            <p style={{ margin: 0, color: '#8297b2', fontSize: '13px' }}>
              Product and order management will be connected next.
            </p>
          </div>

          <ArrowUpRight color="#00d9ff" size={25} />
        </div>
      </main>
    </div>
  );
}
