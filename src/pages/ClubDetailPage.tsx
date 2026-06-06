import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { Club, Application, CATEGORY_LABELS } from '../types';
import '../styles/ClubDetailPage.css';

const ClubDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [club, setClub] = useState<Club | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    const clubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    const found = clubs.find(c => c.id === Number(id));
    if (!found) { navigate('/clubs'); return; }
    setClub(found);
    if (user) {
      const apps: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
      setApplied(apps.some(a => a.clubId === Number(id) && a.userId === user.id));
    }
  }, [id, user, navigate]);

  // 지원하기
  const handleApply = () => {
    if (!isLoggedIn) { navigate('/login'); return; }
    if (!club || applied) return;
    const clubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    const latest = clubs.find(c => c.id === club.id);
    if (!latest || latest.closed || latest.currentMembers >= latest.maxMembers) {
      setClub(latest ?? null); return;
    }
    const updated = clubs.map(c => c.id === club.id ? { ...c, currentMembers: c.currentMembers + 1 } : c);
    localStorage.setItem('clubs', JSON.stringify(updated));
    const apps: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
    apps.push({ clubId: club.id, userId: user!.id, appliedAt: new Date().toISOString() });
    localStorage.setItem('applications', JSON.stringify(apps));
    setClub(prev => prev ? { ...prev, currentMembers: prev.currentMembers + 1 } : prev);
    setApplied(true);
  };

  // 마감 (인원 변경 없이 closed만 true)
  const handleClose = () => {
    if (!club) return;
    const clubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    const updated = clubs.map(c => c.id === club.id ? { ...c, closed: true } : c);
    localStorage.setItem('clubs', JSON.stringify(updated));
    setClub(prev => prev ? { ...prev, closed: true } : prev);
  };

  // 삭제
  const handleDelete = () => {
    if (!club) return;
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    const clubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    localStorage.setItem('clubs', JSON.stringify(clubs.filter(c => c.id !== club.id)));
    navigate('/clubs');
  };

  if (!club) return null;

  const isClosed = club.closed || club.currentMembers >= club.maxMembers;
  const ratio = Math.min(club.currentMembers / club.maxMembers, 1);
  const isOwner = user?.id === club.authorId;

  return (
    <div>
      <Header />
      <div className="club-detail__inner">
        <button className="club-detail__back-btn" onClick={() => navigate(-1)}>← 목록으로</button>

        <div className="club-detail__card">
          <div className={`club-detail__banner club-detail__banner--${isClosed ? 'closed' : 'open'}`} />

          <div className="club-detail__body">
            <div className="club-detail__top">
              <span className={`club-detail__badge club-detail__badge--${club.category}`}>
                {CATEGORY_LABELS[club.category]}
              </span>
              <span className={`club-detail__status club-detail__status--${isClosed ? 'closed' : 'open'}`}>
                {isClosed ? '● 모집완료' : '● 모집중'}
              </span>
            </div>

            <h1 className="club-detail__title">{club.title}</h1>

            <div className="club-detail__info-row">
              <div>
                <div className="club-detail__info-label">모집 인원</div>
                <div className="club-detail__info-value">
                  {club.currentMembers}<span> / {club.maxMembers}명</span>
                </div>
                <div className="club-detail__progress-bar">
                  <div
                    className={`club-detail__progress-fill club-detail__progress-fill--${isClosed ? 'closed' : 'open'}`}
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="club-detail__info-label">등록일</div>
                <div className="club-detail__info-date">
                  {new Date(club.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
            </div>

            <h3 className="club-detail__desc-title">활동 소개</h3>
            <p className="club-detail__desc">{club.description}</p>

            {/* 내가 쓴 글 → 마감/삭제 */}
            {isOwner ? (
              <div className="club-detail__owner-buttons">
                <button
                  className="club-detail__close-btn"
                  onClick={handleClose}
                  disabled={isClosed}
                >
                  {isClosed ? '이미 마감된 글입니다' : '모집 마감하기'}
                </button>
                <button className="club-detail__delete-btn" onClick={handleDelete}>
                  삭제하기
                </button>
              </div>
            ) : applied ? (
              <div className="club-detail__applied">✅ 지원 완료되었습니다</div>
            ) : (
              <button
                className={`club-detail__apply-btn club-detail__apply-btn--${isClosed ? 'closed' : 'open'}`}
                onClick={handleApply}
                disabled={isClosed}
              >
                {isClosed ? '모집이 마감되었습니다' : '지원하기'}
              </button>
            )}
            {!isLoggedIn && !isOwner && (
              <p className="club-detail__login-hint">로그인 후 지원할 수 있습니다</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailPage;