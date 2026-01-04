import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Memes from './pages/Memes';
import MemeDetail from './pages/MemeDetail';
import Cart from './pages/Cart';
import './App.css';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.loggedIn ? children : <Navigate to="/login" replace />;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/memes" element={<PrivateRoute><Memes /></PrivateRoute>} />
        <Route path="/memes/:id" element={<PrivateRoute><MemeDetail /></PrivateRoute>} />
        <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />  // ✅
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>  // ✅
        <AppContent />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
