import React from 'react';
import '../styles/SearchBar.css';

interface Props { value: string; onChange: (v: string) => void; }

const SearchBar: React.FC<Props> = ({ value, onChange }) => (
  <div className="search-bar">
    <svg className="search-bar__icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M11 11l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <input
      type="text"
      className="search-bar__input"
      placeholder="모집글 제목 검색"
      value={value}
      onChange={e => onChange(e.target.value)}
    />
    {value && (
      <button className="search-bar__clear-btn" onClick={() => onChange('')}>✕</button>
    )}
  </div>
);

export default SearchBar;
