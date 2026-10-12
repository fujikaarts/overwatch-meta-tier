import type { TierSourceItem } from '../types';

export const MOCK_SOURCES: TierSourceItem[] = [
  {
    id: 'src-1',
    creatorName: 'Flats',
    creatorRole: '元Top500 タンクストリーマー (YouTube / Twitch)',
    title: 'Season 13 Mid-Patch DEFINITIVE Tank & DPS Tier List',
    platform: 'YouTube',
    publishedAt: '2026-10-10',
    aiStatus: '管理者承認済',
    sourceUrl: 'https://youtube.com',
    sampleCount: 41,
    tags: ['Tank Main', 'NA Region', 'ミッドパッチ対応']
  },
  {
    id: 'src-2',
    creatorName: 'ML7',
    creatorTitle: 'Top500 サポート代表ストリーマー',
    title: 'Juno dominates EVERYTHING: Season 13 Support Tier List',
    platform: 'YouTube',
    publishedAt: '2026-10-10',
    aiStatus: '管理者承認済',
    sourceUrl: 'https://youtube.com',
    sampleCount: 11,
    tags: ['Support Main', 'EU Region', 'ジュノ環境分析']
  },
  {
    id: 'src-3',
    creatorName: 'Ta1yo (タイヨウ)',
    creatorTitle: '元OWLプロ (San Francisco Shock) / ZETA DIVISION',
    title: '【OW】最新パッチのTier表！今勝てるキャラを完全解説',
    platform: 'YouTube',
    publishedAt: '2026-10-09',
    aiStatus: '管理者承認済',
    sourceUrl: 'https://youtube.com',
    sampleCount: 41,
    tags: ['Asia/KR Server', '元プロ目線', '全ロール解説']
  },
  {
    id: 'src-4',
    creatorName: 'KarQ',
    creatorTitle: 'Overwatch 公式パートナー / クリエイター',
    title: 'Top 500 Streamer Consensus Tier List (1 Hero for Every Situation)',
    platform: 'YouTube',
    publishedAt: '2026-10-09',
    aiStatus: '管理者承認済',
    sourceUrl: 'https://youtube.com',
    sampleCount: 41,
    tags: ['統計併用', '全ロール総合', 'Tips付き']
  },
  {
    id: 'src-5',
    creatorName: 'SuperTF',
    creatorTitle: '2× OWL Champion / Twitch Partner',
    title: 'Post-Nerf Mauga & Winston Meta Discussion',
    platform: 'Twitch',
    publishedAt: '2026-10-10',
    aiStatus: 'AI解析完了',
    sourceUrl: 'https://twitch.tv',
    sampleCount: 13,
    tags: ['Tank Only', 'プロメタ', 'スクリム所感']
  },
  {
    id: 'src-6',
    creatorName: 'Spilo',
    creatorTitle: '元プロコーチ / Overwatch Analyst',
    title: 'Competitive Meta Breakdown: Cohesive Team comps in Season 13',
    platform: 'YouTube',
    publishedAt: '2026-10-08',
    aiStatus: 'AI解析完了',
    sourceUrl: 'https://youtube.com',
    sampleCount: 41,
    tags: ['競技シーン', 'シナジー分析', 'マップ相性']
  }
];
