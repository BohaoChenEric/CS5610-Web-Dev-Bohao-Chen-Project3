import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          Bohao-Chen-Project3
        </Link>
        <nav className="header-nav">
          {user ? (
            <>
              <Link to={`/user/${user.username}`} className="header-link">
                {user.username}
              </Link>
              <button onClick={handleLogout} className="header-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="header-link">
                Login
              </Link>
              <Link to="/register" className="header-button">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;