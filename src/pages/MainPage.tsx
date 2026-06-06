import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ClubCard from '../components/ClubCard';
import { Club } from '../types';
import '../styles/MainPage.css';

const SAMPLE_CLUBS: Club[] = [
  { id: 1, title: '⚽ 축구 동아리 팀원 모집', category: 'club', maxMembers: 15, currentMembers: 8, description: '매주 토요일 오전 학교 운동장에서 활동하는 축구 동아리입니다. 실력 무관 누구나 환영!', createdAt: new Date().toISOString(), authorId: 'user1' },
  { id: 2, title: '💻 캡스톤디자인 프로젝트 팀원 모집', category: 'study', maxMembers: 4, currentMembers: 2, description: '웹 개발 관련 캡스톤 프로젝트를 함께 진행할 팀원을 구합니다. React, Node.js 경험자 우대.', createdAt: new Date().toISOString(), authorId: 'user2' },
  { id: 3, title: '🏆 창업아이디어 공모전 참가팀 모집', category: 'contest', maxMembers: 3, currentMembers: 3, description: '2026 대학생 창업아이디어 공모전 참가 팀원 모집합니다.', createdAt: new Date().toISOString(), authorId: 'admin' },
];

const STATS = [
  { label: '등록된 모집글', value: '120+' },
  { label: '활동 중인 팀', value: '40+' },
  { label: '누적 지원자', value: '850+' },
];

const MainPage: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('clubs');
    if (saved) setClubs(JSON.parse(saved));
    else { setClubs(SAMPLE_CLUBS); localStorage.setItem('clubs', JSON.stringify(SAMPLE_CLUBS)); }
  }, []);

  const latest = [...clubs].sort((a, b) => b.id - a.id).slice(0, 3);

  return (
    <div>
      <Header />

      {/* 히어로 */}
      <section className="main__hero">
        <div className="main__hero-glow-right" />
        <div className="main__hero-glow-left" />
        <div className="main__hero-inner">
          <div className="main__hero-tag">
            <span className="main__hero-tag-dot" />
            <span className="main__hero-tag-text">학내 모집 플랫폼</span>
          </div>
          <h1 className="main__hero-title">
            팀원 찾기,<br />
            <span className="main__hero-title-gradient">CampusLink</span>에서 시작하세요
          </h1>
          <p className="main__hero-desc">동아리, 스터디, 공모전 — 캠퍼스의 모든 모집을 한 곳에서 찾고, 지원하고, 함께하세요.</p>
          <div className="main__hero-buttons">
            <Link to="/clubs" className="main__hero-btn-primary">모집글 보기 →</Link>
            <Link to="/login" className="main__hero-btn-secondary">로그인</Link>
          </div>
          <div className="main__hero-stats">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="main__hero-stat-value">{s.value}</div>
                <div className="main__hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 최신 모집글 */}
      <section className="main__latest">
        <div className="main__latest-header">
          <div>
            <p className="main__latest-eyebrow">Latest</p>
            <h2 className="main__latest-title">최신 모집글</h2>
          </div>
          <Link to="/clubs" className="main__latest-more">전체보기 →</Link>
        </div>
        <div className="main__grid">
          {latest.map(club => <ClubCard key={club.id} club={club} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="main__cta">
        <div className="main__cta-inner">
          <h3 className="main__cta-title">팀원을 모집하고 싶으신가요?</h3>
          <p className="main__cta-desc">로그인 후 모집글을 등록하면 캠퍼스 전체에 공개됩니다.</p>
          <Link to="/create" className="main__cta-btn">모집글 작성하기</Link>
        </div>
      </section>
    </div>
  );
};

export default MainPage;
