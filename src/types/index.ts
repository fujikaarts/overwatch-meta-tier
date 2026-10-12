export type HeroRole = 'tank' | 'damage' | 'support';
export type TierGrade = 'S' | 'A' | 'B' | 'C' | 'D';
export type TrendType = 'buffed' | 'nerfed' | 'rising' | 'falling' | 'stable';

export interface CreatorOpinion {
  id: string;
  creatorName: string;
  creatorTitle: string;
  avatarUrl: string;
  assignedTier: TierGrade;
  platform: 'YouTube' | 'X' | 'Twitch';
  sourceUrl: string;
  date: string;
  comment: string;
}

export interface HeroData {
  id: string;
  name: string;
  nameJa: string;
  role: HeroRole;
  tier: TierGrade;
  metaScore: number; // 0 - 100
  winRate: number; // %
  pickRate: number; // %
  trend: TrendType;
  changeScore: number; // 直近変動
  avatarUrl: string;
  influencerStats: {
    totalReviewers: number;
    distribution: Record<TierGrade, number>;
    opinions: CreatorOpinion[];
  };
  statsDetail: {
    rankTier: string;
    kdRatio: number;
    performanceMetric: { label: string; value: string };
    counters: string[];
    synergies: string[];
  };
  patchNotes?: {
    patch: string;
    changes: string[];
  };
}

export interface TierSourceItem {
  id: string;
  creatorName: string;
  creatorRole?: string;
  creatorTitle?: string;
  title: string;
  platform: 'YouTube' | 'X' | 'Twitch';
  publishedAt: string;
  aiStatus: 'AI解析完了' | '管理者承認済' | '解析中';
  sourceUrl: string;
  sampleCount: number;
  tags: string[];
}
