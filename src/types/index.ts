export type CategoryType = 'all' | 'club' | 'study' | 'contest';

export const CATEGORY_LABELS: Record<Exclude<CategoryType, 'all'>, string> = {
  club: '동아리',
  study: '스터디',
  contest: '공모전',
};

export interface Club {
  id: number;
  title: string;
  category: Exclude<CategoryType, 'all'>;
  maxMembers: number;
  currentMembers: number;
  description: string;
  createdAt: string;
  authorId: string;
  closed?: boolean; // 마감 여부 (인원과 무관)
}

export interface Application {
  clubId: number;
  userId: string;
  appliedAt: string;
}