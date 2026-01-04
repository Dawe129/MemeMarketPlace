import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const categories = ["animals", "celebrities", "gaming", "school", "random"];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // MOCK DATA (20 reálných memů)
  const mockMemes = [
    {id:1, name:"Drake Hotline Bling", width:1200,height:1200},
    {id:2, name:"Distracted Boyfriend", width:1200,height:800},
    {id:3, name:"Success Kid", width:500,height:500},
    {id:4, name:"Is This A Pigeon", width:800,height:537},
    {id:5, name:"One Does Not Simply", width:568,height:446},
    {id:6, name:"SpongeBob Mocking", width:502,height:353},
    {id:7, name:"Grumpy Cat", width:320,height:313},
    {id:8, name:"Scumbag Steve", width:720,height:633},
    {id:9, name:"Bad Luck Brian", width:470,height:566},
    {id:10, name:"Ancient Aliens", width:640,height:480},
    {id:11, name:"Boardroom Suggestion", width:640,height:480},
    {id:12, name:"Mocking SpongeBob", width:502,height:353},
    {id:13, name:"The Most Interesting Man", width:640,height:480},
    {id:14, name:"Coulson Knows Nothing", width:640,height:480},
    {id:15, name:"Epic Handshake", width:640,height:480},
    {id:16, name:"Batman Slapping Robin", width:640,height:746},
    {id:17, name:"That Wasn't Very Cash Money", width:640,height:853},
    {id:18, name:"No Talking In The Library", width:640,height:480},
    {id:19, name:"Change My Mind", width:640,height:480},
    {id:20, name:"Left Exit 12 Off Ramp", width:640,height:480}
  ];

  const processedMemes = mockMemes.map(meme => ({
    ...meme,
    rating: Math.floor(Math.random() * 5) + 1,
    category: categories[Math.floor(Math.random() * categories.length)]
  }));

  const memeCount = processedMemes.length;
  const categoryCount = new Set(processedMemes.map(m => m.category)).size;
  const topMeme = processedMemes.sort((a, b) => b.rating - a.rating)[0];

  return (
    <div style={{
      padding: '20px',
      maxWidth: '1400px',
      margin: '0 auto',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: '2.5em',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Meme Marketplace Dashboard 🎉
        </h1>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={() => navigate('/memes')}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1em',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(16,185,129,0.3)'
            }}
          >
            👀 Prohlédnout memy
          </button>
          <button
            onClick={logout}
            style={{
              padding: '15px 30px',
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '1.1em',
              fontWeight: '600',
              boxShadow: '0 8px 25px rgba(239,68,68,0.3)'
            }}
          >
            🚪 Odhlásit se
          </button>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '25px',
        marginBottom: '50px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '40px 30px',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(102,126,234,0.3)'
        }}>
          <div style={{ fontSize: '3em', marginBottom: '10px' }}>📸</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3em' }}>Celkový počet memů</h3>
          <p style={{ fontSize: '4em', fontWeight: 'bold', margin: 0 }}>{memeCount}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '40px 30px',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(240,147,251,0.3)'
        }}>
          <div style={{ fontSize: '3em', marginBottom: '10px' }}>🏷️</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3em' }}>Aktivních kategorií</h3>
          <p style={{ fontSize: '4em', fontWeight: 'bold', margin: 0 }}>{categoryCount}</p>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '40px 30px',
          borderRadius: '20px',
          color: 'white',
          textAlign: 'center',
          boxShadow: '0 20px 40px rgba(79,172,254,0.3)'
        }}>
          <div style={{ fontSize: '3em', marginBottom: '10px' }}>⭐</div>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.3em' }}>Top meme (rating)</h3>
          <p style={{
            fontSize: '1.4em',
            fontWeight: 'bold',
            margin: '15px 0 5px 0',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {topMeme?.name || 'Načítám...'}
          </p>
          <div style={{ fontSize: '1.2em', opacity: 0.9 }}>
            Rating: {topMeme?.rating || 0}/5 ⭐
          </div>
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '30px',
        borderRadius: '20px',
        textAlign: 'center',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#374151', marginBottom: '10px' }}>✅ Systém připraven</h3>
        <p style={{ color: '#6b7280', fontSize: '1.1em' }}>
          Máš <strong>{memeCount}</strong> memů připravených k prohlížení s náhodnými ratingy a kategoriemi.
        </p>
        <p style={{ color: '#3b82f6', fontSize: '1.1em', fontWeight: '500' }}>
          Klikni "Prohlédnout memy" pro grid se seznamem! 👆
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
