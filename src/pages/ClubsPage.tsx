import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ClubCard from '../components/ClubCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import { Club, CategoryType } from '../types';
import '../styles/ClubsPage.css';

const ClubsPage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<CategoryType>('all');

  useEffect(() => {
    const saved = localStorage.getItem('clubs');
    if (saved) setClubs(JSON.parse(saved));
  }, []);

  const filtered = clubs.filter(c => {
    const matchCat = category === 'all' || c.category === category;
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <Header />
      <div className="clubs-page__inner">
        <p className="clubs-page__eyebrow">Explore</p>
        <h1 className="clubs-page__title">모집글 목록</h1>

        <div className="clubs-page__filter-box">
          <div className="clubs-page__search-wrap">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="clubs-page__filter-row">
            <CategoryFilter selected={category} onChange={setCategory} />
            <span className="clubs-page__count">{filtered.length}개</span>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="clubs-page__empty">
            <div className="clubs-page__empty-icon">🔍</div>
            <p className="clubs-page__empty-title">검색 결과가 없어요</p>
            <p className="clubs-page__empty-desc">다른 키워드나 카테고리로 검색해보세요</p>
          </div>
        ) : (
          <div className="clubs-page__grid">
            {filtered.map(club => <ClubCard key={club.id} club={club} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default ClubsPage;
