import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import ClubsPage from './pages/ClubsPage';
import ClubDetailPage from './pages/ClubDetailPage';
import CreatePage from './pages/CreatePage';
import MyPage from './pages/MyPage';
import ErrorPage from './pages/ErrorPage';

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />S
          <Route path="/clubs" element={<ClubsPage />} />
          <Route path="/clubs/:id" element={<ClubDetailPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
