import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './Header';
import Feed from './Feed';
import Login from './Login';
import CreateUser from './CreateUser';
import UserProfile from './UserProfile';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    // Clear token from cookies if you're using them
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Feed user={user} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<CreateUser onLogin={handleLogin} />} />
          <Route path="/user/:username" element={<UserProfile currentUser={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;