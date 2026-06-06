import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ApplicationList from '../components/ApplicationList';
import { useAuth } from '../context/AuthContext';
import { Club, Application, CATEGORY_LABELS } from '../types';
import '../styles/MyPage.css';

type Tab = 'applications' | 'myclubs';

const MyPage: React.FC = () => {
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('applications');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    if (!isLoggedIn) { navigate('/login'); return; }
    const allClubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    setClubs(allClubs);
    const apps: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
    setApplications(apps.filter(a => a.userId === user?.id));
  }, [isLoggedIn, user, navigate]);

  // 지원 취소
  const handleCancelApplication = (clubId: number) => {
    // applications에서 제거
    const allApps: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
    const updated = allApps.filter(a => !(a.clubId === clubId && a.userId === user?.id));
    localStorage.setItem('applications', JSON.stringify(updated));

    // clubs에서 currentMembers -1
    const allClubs: Club[] = JSON.parse(localStorage.getItem('clubs') || '[]');
    const updatedClubs = allClubs.map(c =>
      c.id === clubId ? { ...c, currentMembers: Math.max(0, c.currentMembers - 1) } : c
    );
    localStorage.setItem('clubs', JSON.stringify(updatedClubs));

    // 상태 업데이트
    setApplications(prev => prev.filter(a => a.clubId !== clubId));
    setClubs(updatedClubs);
  };

  const myClubs = clubs.filter(c => c.authorId === user?.id);

  return (
    <div>
      <Header />
      <div className="my-page__inner">

        {/* 프로필 */}
        <div className="my-page__profile">
          <div className="my-page__avatar">
            {user?.id?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="my-page__name">{user?.id}</h1>
            <p className="my-page__desc">
              지원 <strong>{applications.length}개</strong> &nbsp;·&nbsp; 등록 <strong>{myClubs.length}개</strong>
            </p>
          </div>
        </div>

        {/* 탭 */}
        <div className="my-page__tabs">
          <button
            className={`my-page__tab ${tab === 'applications' ? 'active' : ''}`}
            onClick={() => setTab('applications')}
          >
            지원 내역
            <span className="my-page__count-badge">{applications.length}</span>
          </button>
          <button
            className={`my-page__tab ${tab === 'myclubs' ? 'active' : ''}`}
            onClick={() => setTab('myclubs')}
          >
            내가 등록한 글
            <span className="my-page__count-badge">{myClubs.length}</span>
          </button>
        </div>

        {/* 지원 내역 */}
        {tab === 'applications' && (
          <ApplicationList
            applications={applications}
            clubs={clubs}
            onCancel={handleCancelApplication}
          />
        )}

        {/* 내가 등록한 글 */}
        {tab === 'myclubs' && (
          myClubs.length === 0 ? (
            <div className="my-page__empty">
              <div className="my-page__empty-icon">📝</div>
              <p className="my-page__empty-text">아직 등록한 모집글이 없어요</p>
              <Link to="/create" className="my-page__empty-link">모집글 작성하기</Link>
            </div>
          ) : (
            <div className="my-page__club-list">
              {myClubs.map(club => {
                const isClosed = club.closed || club.currentMembers >= club.maxMembers;
                return (
                  <Link key={club.id} to={`/clubs/${club.id}`} className="my-page__club-item">
                    <div className="my-page__club-item-left">
                      <span className={`my-page__club-badge my-page__club-badge--${club.category}`}>
                        {CATEGORY_LABELS[club.category]}
                      </span>
                      <span className="my-page__club-title">{club.title}</span>
                    </div>
                    <div className="my-page__club-item-right">
                      <span className={`my-page__club-status my-page__club-status--${isClosed ? 'closed' : 'open'}`}>
                        {isClosed ? '마감' : '모집중'}
                      </span>
                      <span className="my-page__club-count">
                        {club.currentMembers}/{club.maxMembers}명
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MyPage;