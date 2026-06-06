import React, { useState } from 'react';
import { Club, CATEGORY_LABELS } from '../types';
import '../styles/ClubForm.css';

interface Props {
  onSubmit: (club: Omit<Club, 'id' | 'currentMembers' | 'createdAt' | 'authorId'>) => void;
  onCancel: () => void;
}

const ClubForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Club['category']>('club');
  const [maxMembers, setMaxMembers] = useState(5);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!title.trim()) { setError('제목을 입력해주세요.'); return; }
    if (!description.trim()) { setError('활동 설명을 입력해주세요.'); return; }
    if (maxMembers < 2 || maxMembers > 50) { setError('모집 인원은 2~50명 사이로 입력해주세요.'); return; }
    setError('');
    onSubmit({ title: title.trim(), category, maxMembers, description: description.trim() });
  };

  return (
    <div className="club-form">
      {error && <div className="club-form__error">{error}</div>}

      <div className="club-form__field">
        <label className="club-form__label">제목 *</label>
        <input className="club-form__input" placeholder="모집글 제목을 입력하세요" value={title} onChange={e => setTitle(e.target.value)} maxLength={50} />
        <div className="club-form__count">{title.length}/50</div>
      </div>

      <div className="club-form__field">
        <label className="club-form__label">카테고리 *</label>
        <select className="club-form__select" value={category} onChange={e => setCategory(e.target.value as Club['category'])}>
          {(Object.entries(CATEGORY_LABELS) as [Club['category'], string][]).map(([val, label]) => (
            <option key={val} value={val}>{label}</option>
          ))}
        </select>
      </div>

      <div className="club-form__field">
        <label className="club-form__label">모집 인원 *</label>
        <div className="club-form__members-row">
          <input className="club-form__members-input" type="number" min={2} max={50} value={maxMembers} onChange={e => setMaxMembers(Number(e.target.value))} />
          <span className="club-form__members-hint">명 (최소 2명, 최대 50명)</span>
        </div>
      </div>

      <div className="club-form__field">
        <label className="club-form__label">활동 설명 *</label>
        <textarea className="club-form__textarea" placeholder="활동 내용, 일정, 지원 방법 등을 자유롭게 작성해주세요" value={description} onChange={e => setDescription(e.target.value)} maxLength={500} />
        <div className="club-form__count">{description.length}/500</div>
      </div>

      <div className="club-form__buttons">
        <button className="club-form__cancel-btn" onClick={onCancel}>취소</button>
        <button className="club-form__submit-btn" onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
};

export default ClubForm;
