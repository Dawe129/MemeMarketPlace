import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { MEMES_DATA } from '../data/memesData';

const categories = ["All", "animals", "celebrities", "gaming", "school", "random"];

const Memes = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredMemes, setFilteredMemes] = useState(MEMES_DATA);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    let filtered = MEMES_DATA;
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(meme => meme.category === selectedCategory);
    }
    if (searchTerm) {
      filtered = filtered.filter(meme =>
        meme.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredMemes(filtered);
  }, [selectedCategory, searchTerm]);

  const handleMemeClick = useCallback((memeId) => {
    navigate(`/memes/${memeId}`);
  }, [navigate]);

  const cardStyle = {
    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1), 0 4px 6px rgba(0,0,0,0.05)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '20px',
    overflow: 'hidden',
    cursor: 'pointer'
  };

  const hoverStyle = {
    transform: 'translateY(-8px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.15), 0 8px 12px rgba(0,0,0,0.08)'
  };

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{
          fontSize: '3.5rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: 0,
          fontWeight: 800
        }}>
          😂 Memes ({MEMES_DATA.length})
        </h1>
        {user && (
          <p style={{
            fontSize: '1.3rem',
            color: '#64748b',
            marginTop: '1rem',
            fontWeight: 500
          }}>
            Vítej {user.name}!
          </p>
        )}
      </div>

      {/* FILTERS + SEARCH */}
      <div style={{
        display: 'flex',
        gap: '2rem',
        marginBottom: '3rem',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '1rem 2rem',
                background: selectedCategory === cat
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : 'white',
                color: selectedCategory === cat ? 'white' : '#374151',
                border: '2px solid #e5e7eb',
                borderRadius: '50px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.95rem',
                boxShadow: selectedCategory === cat
                  ? '0 8px 25px rgba(102, 126, 234, 0.4)'
                  : '0 2px 8px rgba(0,0,0,0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCategory !== cat) {
                  e.target.style.transform = '';
                  e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="🔍 Hledej meme..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '1.2rem 2.5rem',
            border: '2px solid #e5e7eb',
            borderRadius: '50px',
            fontSize: '1.1rem',
            width: '350px',
            outline: 'none',
            background: 'white',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#667eea';
            e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#e5e7eb';
            e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
          }}
        />
      </div>

      {/* MEMES GRID */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
        gap: '2.5rem'
      }}>
        {filteredMemes.map(meme => (
          <div
            key={meme.id}
            style={{...cardStyle}}
            onClick={() => handleMemeClick(meme.id)}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-8px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = ''; }}
          >
            <div style={{
              width: '100%',
              height: '240px',
              overflow: 'hidden',
              borderRadius: '16px 16px 0 0'
            }}>
              <img
                src={meme.url}
                alt={meme.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease'
                }}
                onMouseEnter={(e) => { e.target.style.transform = 'scale(1.05)'; }}
                onMouseLeave={(e) => { e.target.style.transform = ''; }}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                margin: '0 0 1rem 0',
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#1f2937'
              }}>
                {meme.name}
              </h3>
              <span style={{
                display: 'inline-block',
                background: getCategoryColor(meme.category),
                color: 'white',
                padding: '0.5rem 1.5rem',
                borderRadius: '25px',
                fontSize: '0.85rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {meme.category}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredMemes.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '6rem 2rem',
          color: '#9ca3af'
        }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>😢</h2>
          <p style={{ fontSize: '1.3rem' }}>Žádné memy nenalezeny</p>
        </div>
      )}
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

export default Memes;
