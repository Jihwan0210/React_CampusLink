import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import '../styles/ErrorPage.css';

const ErrorPage: React.FC = () => (
  <div>
    <Header />
    <div className="error-page__inner">
      <div className="error-page__code">404</div>
      <h2 className="error-page__title">페이지를 찾을 수 없어요</h2>
      <p className="error-page__desc">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <Link to="/" className="error-page__btn">홈으로 가기</Link>
    </div>
  </div>
);

export default ErrorPage;
