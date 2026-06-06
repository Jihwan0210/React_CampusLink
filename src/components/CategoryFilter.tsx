import React from 'react';
import { CategoryType } from '../types';
import '../styles/CategoryFilter.css';

interface Props { selected: CategoryType; onChange: (c: CategoryType) => void; }

const CATEGORIES: { value: CategoryType; label: string; emoji: string }[] = [
  { value: 'all',     label: '전체',   emoji: '✦' },
  { value: 'club',    label: '동아리', emoji: '🎯' },
  { value: 'study',   label: '스터디', emoji: '📚' },
  { value: 'contest', label: '공모전', emoji: '🏆' },
];

const CategoryFilter: React.FC<Props> = ({ selected, onChange }) => (
  <div className="category-filter">
    {CATEGORIES.map(({ value, label, emoji }) => (
      <button
        key={value}
        className={`category-filter__btn ${selected === value ? 'active' : ''}`}
        onClick={() => onChange(value)}
      >
        <span className="category-filter__emoji">{emoji}</span>
        {label}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
