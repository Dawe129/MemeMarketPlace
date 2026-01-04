import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MEMES_DATA } from '../data/memesData';

const MemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [meme, setMeme] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundMeme = MEMES_DATA.find(m => m.id === parseInt(id));
    setMeme(foundMeme);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60vh',
        fontSize: '2rem'
      }}>
        Nahrávám...
      </div>
    );
  }

  if (!meme) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '6rem 2rem'
      }}>
        <h2 style={{ color: '#ef4444', fontSize: '3rem' }}>❌</h2>
        <p style={{ fontSize: '1.5rem', color: '#6b7280' }}>Meme nenalezeno</p>
        <button
          onClick={() => navigate('/memes')}
          style={{
            marginTop: '2rem',
            padding: '1rem 3rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          ← Zpět na memy
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate('/memes')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem 2rem',
          background: 'white',
          border: '2px solid #e5e7eb',
          borderRadius: '50px',
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: '3rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
        }}
      >
        ← Zpět na memy
      </button>

      {/* MEME DETAIL CARD */}
      <div style={{
        background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
        borderRadius: '24px',
        padding: '3rem',
        boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
        textAlign: 'center'
      }}>
        <img
          src={meme.url}
          alt={meme.name}
          style={{
            maxWidth: '100%',
            maxHeight: '600px',
            width: 'auto',
            height: 'auto',
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            marginBottom: '2.5rem'
          }}
        />

        <h1 style={{
          fontSize: '3rem',
          fontWeight: 800,
          color: '#1f2937',
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {meme.name}
        </h1>

        <div style={{
          display: 'inline-block',
          background: getCategoryColor(meme.category),
          color: 'white',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          fontSize: '1.2rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
        }}>
          {meme.category}
        </div>

        <p style={{
          marginTop: '2rem',
          fontSize: '1.2rem',
          color: '#6b7280',
          fontStyle: 'italic'
        }}>
          ID: {meme.id} • Rozměry: {meme.width}×{meme.height}px
        </p>
      </div>
    </div>
  );
};

const getCategoryColor = (category) => {
  const colors = {
    animals: '#10b981',
    celebrities: '#667eea',
    gaming: '#f59e0b',
    school: '#ec4899',
    random: '#06b6d4'
  };
  return colors[category] || '#6b7280';
};

export default MemeDetail;
