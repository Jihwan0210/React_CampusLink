import React from 'react';
import { Link } from 'react-router-dom';
import { Club, CATEGORY_LABELS } from '../types';
import '../styles/ClubCard.css';

interface Props { club: Club; }

const ClubCard: React.FC<Props> = ({ club }) => {
  const isClosed = club.closed || club.currentMembers >= club.maxMembers;
  const ratio = Math.min(club.currentMembers / club.maxMembers, 1);

  return (
    <Link to={`/clubs/${club.id}`} className="club-card">
      <div className="club-card__inner">
        <div className="club-card__top">
          <span className={`club-card__badge club-card__badge--${club.category}`}>
            {CATEGORY_LABELS[club.category]}
          </span>
          <span className={`club-card__status club-card__status--${isClosed ? 'closed' : 'open'}`}>
            {isClosed ? '마감' : '모집중'}
          </span>
        </div>

        <h3 className="club-card__title">{club.title}</h3>
        <p className="club-card__desc">{club.description}</p>

        <div className="club-card__footer">
          <div className="club-card__progress-header">
            <span className="club-card__progress-label">참여 현황</span>
            <span className={`club-card__progress-count club-card__progress-count--${isClosed ? 'closed' : 'open'}`}>
              {club.currentMembers}<span> / {club.maxMembers}</span>
            </span>
          </div>
          <div className="club-card__progress-bar">
            <div
              className={`club-card__progress-fill club-card__progress-fill--${isClosed ? 'closed' : 'open'}`}
              style={{ width: `${ratio * 100}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ClubCard;