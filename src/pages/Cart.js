import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, addItem, removeItem, decreaseItem, clearCart, getTotalPrice, cartCount } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
        <h2 style={{ fontSize: '3rem', color: '#6b7280' }}>🛒</h2>
        <p style={{ fontSize: '1.3rem', color: '#9ca3af' }}>Košík je prázdný</p>
        <button onClick={() => navigate('/memes')} style={{
          marginTop: '2rem', padding: '1rem 3rem', background: '#667eea',
          color: 'white', border: 'none', borderRadius: '50px', fontSize: '1.1rem',
          fontWeight: 600, cursor: 'pointer'
        }}>
          Prohlédnout memy
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem' }}>🛒 Košík ({cartCount} ks)</h1>
        <button onClick={clearCart} style={{
          padding: '1rem 2rem', background: '#ef4444', color: 'white',
          border: 'none', borderRadius: '25px', fontWeight: 600, cursor: 'pointer'
        }}>
          Vysypat košík
        </button>
      </div>

      {cart.map(item => {
        const price = (item.rating * 25).toFixed(2);
        const subtotal = (item.rating * 25 * item.count).toFixed(2);
        return (
          <div key={item.id} style={{
            display: 'grid', gridTemplateColumns: '80px 1fr auto 120px',
            gap: '1.5rem', alignItems: 'center', padding: '2rem', marginBottom: '1rem',
            background: 'white', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}>
            <img src={item.url} alt={item.name} style={{
              width: '80px', height: '80px', objectFit: 'cover', borderRadius: '12px'
            }} />
            <div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>{item.name}</h3>
              <div style={{ color: '#6b7280' }}>Rating: {item.rating}⭐ | {price}Kč/ks</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => decreaseItem(item.id)} style={{
                background: '#667eea', color: 'white', border: 'none', width: '40px',
                height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem'
              }}>-</button>
              <span style={{ fontWeight: 700, minWidth: '30px' }}>{item.count}</span>
              <button onClick={() => addItem(item)} style={{
                background: '#10b981', color: 'white', border: 'none', width: '40px',
                height: '40px', borderRadius: '50%', cursor: 'pointer', fontSize: '1.2rem'
              }}>+</button>
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#059669', textAlign: 'right' }}>
              {subtotal}Kč
            </div>
            <button onClick={() => removeItem(item.id)} style={{
              background: '#ef4444', color: 'white', border: 'none', padding: '0.8rem 1.5rem',
              borderRadius: '25px', cursor: 'pointer', fontWeight: 600
            }}>
              Odebrat
            </button>
          </div>
        );
      })}

      <div style={{
        marginTop: '3rem', padding: '2rem', background: '#f8fafc', borderRadius: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2rem' }}>Celkem: <strong>{getTotalPrice()} Kč</strong></h2>
      </div>
    </div>
  );
};

export default Cart;
