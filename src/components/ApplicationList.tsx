import React from 'react';
import { Link } from 'react-router-dom';
import { Club, Application, CATEGORY_LABELS } from '../types';
import '../styles/ApplicationList.css';

interface Props {
  applications: Application[];
  clubs: Club[];
  onCancel?: (clubId: number) => void; // 취소 콜백 (MyPage에서만 사용)
}

const ApplicationList: React.FC<Props> = ({ applications, clubs, onCancel }) => {
  if (applications.length === 0) {
    return (
      <div className="application-list__empty">
        <div className="application-list__empty-icon">📭</div>
        <p className="application-list__empty-text">아직 지원한 모집글이 없어요</p>
        <Link to="/clubs" className="application-list__empty-link">모집글 보러가기</Link>
      </div>
    );
  }

  const handleCancel = (e: React.MouseEvent, clubId: number) => {
    e.preventDefault(); // Link 이동 막기
    if (!window.confirm('지원을 취소하시겠습니까?')) return;
    onCancel?.(clubId);
  };

  return (
    <div className="application-list">
      {applications.map(app => {
        const club = clubs.find(c => c.id === app.clubId);
        if (!club) return null;
        return (
          <Link key={`${app.clubId}-${app.userId}`} to={`/clubs/${club.id}`} className="application-list__item">
            <div className="application-list__card">
              <div className="application-list__card-left">
                <span className={`application-list__badge application-list__badge--${club.category}`}>
                  {CATEGORY_LABELS[club.category]}
                </span>
                <span className="application-list__title">{club.title}</span>
              </div>
              <div className="application-list__card-right">
                <span className="application-list__date">
                  {new Date(app.appliedAt).toLocaleDateString('ko-KR')}
                </span>
                {onCancel && (
                  <button
                    className="application-list__cancel-btn"
                    onClick={e => handleCancel(e, app.clubId)}
                  >
                    취소
                  </button>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ApplicationList;