import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Header.css';

const Header: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/clubs', label: '모집글' },
    ...(isLoggedIn ? [{ to: '/create', label: '글쓰기' }, { to: '/mypage', label: '마이' }] : []),
  ];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <div className="header__logo-icon">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M3 14V7l6-4 6 4v7" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
              <rect x="6.5" y="9" width="5" height="5" rx="1" stroke="#fff" strokeWidth="1.4"/>
            </svg>
          </div>
          <span className="header__logo-text">CampusLink</span>
        </Link>

        <nav className="header__nav">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className={`header__nav-link ${isActive(to) ? 'active' : ''}`}>
              {label}
            </Link>
          ))}
          {isLoggedIn ? (
            <button className="header__logout-btn" onClick={() => { logout(); navigate('/'); }}>
              로그아웃
            </button>
          ) : (
            <Link to="/login" className="header__login-btn">로그인</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
