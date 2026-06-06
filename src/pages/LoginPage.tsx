import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!id.trim() || !pw.trim()) { setError('아이디와 비밀번호를 모두 입력해주세요.'); return; }
    if (login(id, pw)) navigate('/');
    else setError('아이디 또는 비밀번호가 올바르지 않습니다.');
  };

  return (
    <div className="login-page">
      <div className="login-page__top">
        <Link to="/" className="login-page__logo">
          <div className="login-page__logo-icon">
            <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
              <path d="M3 14V7l6-4 6 4v7" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round"/>
              <rect x="6.5" y="9" width="5" height="5" rx="1" stroke="#fff" strokeWidth="1.4"/>
            </svg>
          </div>
          <span className="login-page__logo-text">CampusLink</span>
        </Link>
      </div>

      <div className="login-page__body">
        <div className="login-page__container">
          <div className="login-page__heading">
            <h1 className="login-page__title">로그인</h1>
            <p className="login-page__subtitle">계정에 로그인하여 모집글을 작성하고 지원하세요</p>
          </div>

          <div className="login-page__card">
            {error && <div className="login-page__error">{error}</div>}

            <div className="login-page__field">
              <label className="login-page__label">아이디</label>
              <input className="login-page__input" placeholder="아이디 입력" value={id}
                onChange={e => setId(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>

            <div className="login-page__field">
              <label className="login-page__label">비밀번호</label>
              <input className="login-page__input" type="password" placeholder="비밀번호 입력" value={pw}
                onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>

            <button className="login-page__submit-btn" onClick={handleLogin}>로그인</button>

            <div className="login-page__hint">테스트 계정: admin / 1234</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
