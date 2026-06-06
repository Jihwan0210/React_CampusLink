import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ClubForm from '../components/ClubForm';
import { useAuth } from '../context/AuthContext';
import { Club } from '../types';
import '../styles/CreatePage.css';

const CreatePage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (!isLoggedIn) navigate('/login'); }, [isLoggedIn, navigate]);

  const handleSubmit = (data: Omit<Club, 'id' | 'currentMembers' | 'createdAt' | 'authorId'>) => {
    const clubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    const newClub: Club = {
      ...data,
      id: Date.now() * 1000 + Math.floor(Math.random() * 1000),
      currentMembers: 1,
      createdAt: new Date().toISOString(),
      authorId: user?.id || 'admin',
    };
    clubs.unshift(newClub);
    localStorage.setItem('clubs', JSON.stringify(clubs));
    navigate('/clubs');
  };

  return (
    <div>
      <Header />
      <div className="create-page__inner">
        <p className="create-page__eyebrow">New Post</p>
        <h1 className="create-page__title">모집글 작성</h1>
        <div className="create-page__card">
          <ClubForm onSubmit={handleSubmit} onCancel={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
