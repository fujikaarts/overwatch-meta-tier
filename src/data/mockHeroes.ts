import type { HeroData } from '../types';
import { OFFICIAL_HERO_PORTRAITS } from '../utils/officialAvatars';

export const MOCK_HEROES: HeroData[] = [
  // ==========================================
  // --- S TIER ---
  // ==========================================
  {
    id: 'dva',
    name: 'D.Va',
    nameJa: 'D.Va',
    role: 'tank',
    tier: 'S',
    metaScore: 96.8,
    winRate: 54.1,
    pickRate: 9.2,
    trend: 'rising',
    changeScore: 3.2,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['dva'] || '',
    influencerStats: {
      totalReviewers: 14,
      distribution: { S: 12, A: 2, B: 0, C: 0, D: 0 },
      opinions: [
        {
          id: 'op-1',
          creatorName: 'Flats',
          creatorTitle: '元Top500 タンクストリーマー',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
          assignedTier: 'S',
          platform: 'YouTube',
          sourceUrl: 'https://youtube.com',
          date: '2026-10-10',
          comment: 'ディフェンス・マトリックスの持続時間とマイクロ・ミサイルのバースト火力により、現在の高台防衛メタにおいて文句なしの最強タンク。'
        },
        {
          id: 'op-2',
          creatorName: 'Ta1yo',
          creatorTitle: '元OWLプロ (SF Shock)',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
          assignedTier: 'S',
          platform: 'YouTube',
          sourceUrl: 'https://youtube.com',
          date: '2026-10-09',
          comment: '機動力とピール性能が高く、ジュノやアナを即座に守りながら敵サポを落とせる。ソロQでも構成を選ばず強い。'
        }
      ]
    },
    statsDetail: {
      rankTier: 'GM & Champion (直近14日)',
      kdRatio: 3.82,
      performanceMetric: { label: '平均被ダメージ軽減', value: '11,450 / 10分' },
      counters: ['ファラ', 'ウィドウメイカー', 'ウィンストン'],
      synergies: ['アナ', 'キリコ', 'トレーサー']
    },
    patchNotes: {
      patch: 'Season 13 Mid-Patch',
      changes: ['ディフェンス・マトリックスのクールダウンがわずかに短縮', 'ブースターの接触ダメージが15→25に増加']
    }
  },
  {
    id: 'zarya',
    name: 'Zarya',
    nameJa: 'ザリア',
    role: 'tank',
    tier: 'S',
    metaScore: 94.2,
    winRate: 53.4,
    pickRate: 7.8,
    trend: 'buffed',
    changeScore: 4.5,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['zarya'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 9, A: 4, B: 0, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'GM & Master',
      kdRatio: 3.65,
      performanceMetric: { label: '平均エネルギー', value: '62%' },
      counters: ['D.Va', 'オリーサ'],
      synergies: ['ゲンジ', 'リーパー']
    }
  },
  {
    id: 'tracer',
    name: 'Tracer',
    nameJa: 'トレーサー',
    role: 'damage',
    tier: 'S',
    metaScore: 97.4,
    winRate: 54.0,
    pickRate: 11.8,
    trend: 'stable',
    changeScore: 1.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['tracer'] || '',
    influencerStats: {
      totalReviewers: 14,
      distribution: { S: 13, A: 1, B: 0, C: 0, D: 0 },
      opinions: [
        {
          id: 'op-t1',
          creatorName: 'Ta1yo',
          creatorTitle: '元OWLプロ',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
          assignedTier: 'S',
          platform: 'YouTube',
          sourceUrl: 'https://youtube.com',
          date: '2026-10-09',
          comment: 'DPSパッシブ（回復阻害）との相性が圧倒的。上位帯では常にban/pick争いの中心。'
        }
      ]
    },
    statsDetail: {
      rankTier: 'GM & Champion',
      kdRatio: 4.02,
      performanceMetric: { label: 'ソロキル数', value: '5.1 / 10分' },
      counters: ['ゼニヤッタ', 'アナ', 'ウィドウメイカー'],
      synergies: ['ウィンストン', 'D.Va']
    }
  },
  {
    id: 'juno',
    name: 'Juno',
    nameJa: 'ジュノ',
    role: 'support',
    tier: 'S',
    metaScore: 98.9,
    winRate: 55.1,
    pickRate: 15.2,
    trend: 'rising',
    changeScore: 6.7,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['juno'] || '',
    influencerStats: {
      totalReviewers: 14,
      distribution: { S: 14, A: 0, B: 0, C: 0, D: 0 },
      opinions: [
        {
          id: 'op-j1',
          creatorName: 'ML7',
          creatorTitle: 'Top500 サポート代表ストリーマー',
          avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces',
          assignedTier: 'S',
          platform: 'YouTube',
          sourceUrl: 'https://youtube.com',
          date: '2026-10-10',
          comment: 'ハイパードームと軌道光線の制圧力が異常。ルシオとアナの良いとこ取りで現環境の完全なマストピック。'
        }
      ]
    },
    statsDetail: {
      rankTier: 'Grandmaster & Champion',
      kdRatio: 4.15,
      performanceMetric: { label: 'スピードリング加速人数', value: '44.0人 / 10分' },
      counters: ['ラインハルト', 'ラマットラ'],
      synergies: ['アナ', 'D.Va', 'ウィンストン']
    }
  },
  {
    id: 'ana',
    name: 'Ana',
    nameJa: 'アナ',
    role: 'support',
    tier: 'S',
    metaScore: 95.1,
    winRate: 53.0,
    pickRate: 13.1,
    trend: 'stable',
    changeScore: 0.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['ana'] || '',
    influencerStats: {
      totalReviewers: 14,
      distribution: { S: 11, A: 3, B: 0, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.25,
      performanceMetric: { label: '阻害ビン有効数', value: '19.2回 / 10分' },
      counters: ['ロードホッグ', 'マウガ'],
      synergies: ['ゲンジ', 'ジュノ']
    }
  },
  {
    id: 'kiriko',
    name: 'Kiriko',
    nameJa: 'キリコ',
    role: 'support',
    tier: 'S',
    metaScore: 93.5,
    winRate: 52.6,
    pickRate: 11.5,
    trend: 'stable',
    changeScore: 0.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['kiriko'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 8, A: 5, B: 0, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.52,
      performanceMetric: { label: 'お札回復量', value: '9,800 / 10分' },
      counters: ['アナ (阻害解除)', 'ソンブラ'],
      synergies: ['トレーサー', 'D.Va']
    }
  },

  // ==========================================
  // --- A TIER ---
  // ==========================================
  {
    id: 'winston',
    name: 'Winston',
    nameJa: 'ウィンストン',
    role: 'tank',
    tier: 'A',
    metaScore: 89.2,
    winRate: 52.1,
    pickRate: 6.4,
    trend: 'stable',
    changeScore: 0.5,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['winston'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 5, A: 8, B: 0, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'GM & Champion',
      kdRatio: 3.28,
      performanceMetric: { label: 'バリアブロック', value: '14,000 / 10分' },
      counters: ['スナイパー', 'ゲンジ'],
      synergies: ['トレーサー', 'アナ']
    }
  },
  {
    id: 'sigma',
    name: 'Sigma',
    nameJa: 'シグマ',
    role: 'tank',
    tier: 'A',
    metaScore: 85.8,
    winRate: 52.2,
    pickRate: 5.6,
    trend: 'stable',
    changeScore: 0.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['sigma'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 2, A: 9, B: 1, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.71,
      performanceMetric: { label: 'シールド吸収量', value: '13,200 / 10分' },
      counters: ['バスティオン', 'トールビョーン'],
      synergies: ['アッシュ', 'バティスト']
    }
  },
  {
    id: 'sojourn',
    name: 'Sojourn',
    nameJa: 'ソジョーン',
    role: 'damage',
    tier: 'A',
    metaScore: 88.4,
    winRate: 52.5,
    pickRate: 8.9,
    trend: 'rising',
    changeScore: 2.3,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['sojourn'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 4, A: 9, B: 0, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'GM & Champion',
      kdRatio: 3.84,
      performanceMetric: { label: 'レールガン直撃率', value: '54.2%' },
      counters: ['ファラ', 'トールビョーン'],
      synergies: ['マーシー', 'ジュノ']
    }
  },
  {
    id: 'ashe',
    name: 'Ashe',
    nameJa: 'アッシュ',
    role: 'damage',
    tier: 'A',
    metaScore: 87.6,
    winRate: 52.8,
    pickRate: 8.7,
    trend: 'rising',
    changeScore: 3.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['ashe'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 3, A: 10, B: 0, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.55,
      performanceMetric: { label: 'ダイナマイトキル', value: '8.4 / 10分' },
      counters: ['ファラ', 'エコー'],
      synergies: ['マーシー', 'シグマ']
    }
  },
  {
    id: 'venture',
    name: 'Venture',
    nameJa: 'ベンチャー',
    role: 'damage',
    tier: 'A',
    metaScore: 86.1,
    winRate: 52.4,
    pickRate: 6.8,
    trend: 'buffed',
    changeScore: 4.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['venture'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 2, A: 9, B: 1, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.40,
      performanceMetric: { label: 'バリア獲得量', value: '4,100 / 10分' },
      counters: ['ラインハルト', 'トールビョーン'],
      synergies: ['ルシオ', 'ラマットラ']
    }
  },
  {
    id: 'bastion',
    name: 'Bastion',
    nameJa: 'バスティオン',
    role: 'damage',
    tier: 'A',
    metaScore: 84.5,
    winRate: 51.9,
    pickRate: 5.8,
    trend: 'stable',
    changeScore: 0.6,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['bastion'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 1, A: 9, B: 2, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.15,
      performanceMetric: { label: 'アサルト時ダメージ', value: '6,800 / 10分' },
      counters: ['ウィンストン', 'ラインハルト'],
      synergies: ['バティスト', 'シグマ']
    }
  },
  {
    id: 'baptiste',
    name: 'Baptiste',
    nameJa: 'バティスト',
    role: 'support',
    tier: 'A',
    metaScore: 83.9,
    winRate: 51.5,
    pickRate: 6.2,
    trend: 'stable',
    changeScore: 0.3,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['baptiste'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 2, A: 8, B: 2, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.18,
      performanceMetric: { label: 'イモータリティ救助', value: '4.9回 / 10分' },
      counters: ['ファラ'],
      synergies: ['シグマ', 'ラマットラ']
    }
  },
  {
    id: 'illari',
    name: 'Illari',
    nameJa: 'イラリー',
    role: 'support',
    tier: 'A',
    metaScore: 82.7,
    winRate: 51.8,
    pickRate: 5.9,
    trend: 'stable',
    changeScore: 0.9,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['illari'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 1, A: 9, B: 2, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.32,
      performanceMetric: { label: 'パイロン稼働率', value: '82%' },
      counters: ['トレーサー'],
      synergies: ['アッシュ', 'シグマ']
    }
  },

  // ==========================================
  // --- B TIER ---
  // ==========================================
  {
    id: 'doomfist',
    name: 'Doomfist',
    nameJa: 'ドゥームフィスト',
    role: 'tank',
    tier: 'B',
    metaScore: 78.4,
    winRate: 50.8,
    pickRate: 5.7,
    trend: 'stable',
    changeScore: -0.3,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['doomfist'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 1, A: 4, B: 7, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.10,
      performanceMetric: { label: '強化パンチヒット', value: '14.2 / 10分' },
      counters: ['ラインハルト'],
      synergies: ['キリコ', 'トレーサー']
    }
  },
  {
    id: 'junkerqueen',
    name: 'Junker Queen',
    nameJa: 'ジャンカー・クイーン',
    role: 'tank',
    tier: 'B',
    metaScore: 77.1,
    winRate: 51.0,
    pickRate: 4.5,
    trend: 'stable',
    changeScore: 0.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['junkerqueen'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 4, B: 8, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.30,
      performanceMetric: { label: '自己回復創傷', value: '4,800 / 10分' },
      counters: ['ロードホッグ'],
      synergies: ['ルシオ', 'ブリギッテ']
    }
  },
  {
    id: 'wreckingball',
    name: 'Wrecking Ball',
    nameJa: 'レッキング・ボール',
    role: 'tank',
    tier: 'B',
    metaScore: 75.3,
    winRate: 50.4,
    pickRate: 3.6,
    trend: 'stable',
    changeScore: 0.2,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['wreckingball'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 3, B: 8, C: 1, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.45,
      performanceMetric: { label: 'パイルドライバーヒット', value: '18.1 / 10分' },
      counters: ['ウィドウメイカー'],
      synergies: ['トレーサー', 'ソンブラ']
    }
  },
  {
    id: 'ramattra',
    name: 'Ramattra',
    nameJa: 'ラマットラ',
    role: 'tank',
    tier: 'B',
    metaScore: 76.5,
    winRate: 50.7,
    pickRate: 4.8,
    trend: 'stable',
    changeScore: 0.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['ramattra'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 4, B: 7, C: 1, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.35,
      performanceMetric: { label: 'ブロック軽減量', value: '9,500 / 10分' },
      counters: ['ラインハルト'],
      synergies: ['ルシオ', 'バティスト']
    }
  },
  {
    id: 'genji',
    name: 'Genji',
    nameJa: 'ゲンジ',
    role: 'damage',
    tier: 'B',
    metaScore: 79.2,
    winRate: 50.6,
    pickRate: 7.9,
    trend: 'stable',
    changeScore: -0.2,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['genji'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 1, A: 5, B: 7, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.12,
      performanceMetric: { label: '風斬りリセットキル', value: '7.8 / 10分' },
      counters: ['バスティオン', 'ハンゾー'],
      synergies: ['アナ', 'ウィンストン']
    }
  },
  {
    id: 'cassidy',
    name: 'Cassidy',
    nameJa: 'キャスディ',
    role: 'damage',
    tier: 'B',
    metaScore: 74.8,
    winRate: 49.8,
    pickRate: 6.9,
    trend: 'falling',
    changeScore: -2.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['cassidy'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 0, A: 3, B: 9, C: 1, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.92,
      performanceMetric: { label: 'マグネティックフラッシュキル', value: '6.4 / 10分' },
      counters: ['トレーサー', 'ゲンジ'],
      synergies: ['ラマットラ']
    }
  },
  {
    id: 'sombra',
    name: 'Sombra',
    nameJa: 'ソンブラ',
    role: 'damage',
    tier: 'B',
    metaScore: 73.5,
    winRate: 49.5,
    pickRate: 6.1,
    trend: 'nerfed',
    changeScore: -4.5,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['sombra'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 0, A: 3, B: 8, C: 2, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.01,
      performanceMetric: { label: 'ハック成功数', value: '28.1 / 10分' },
      counters: ['ドゥームフィスト', 'レッキング・ボール'],
      synergies: ['トレーサー', 'D.Va']
    }
  },
  {
    id: 'reaper',
    name: 'Reaper',
    nameJa: 'リーパー',
    role: 'damage',
    tier: 'B',
    metaScore: 71.9,
    winRate: 50.1,
    pickRate: 4.8,
    trend: 'stable',
    changeScore: 0.3,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['reaper'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 2, B: 8, C: 2, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.85,
      performanceMetric: { label: 'タンク与ダメージ比率', value: '46%' },
      counters: ['ウィンストン', 'マウガ'],
      synergies: ['ルシオ', 'ザリア']
    }
  },
  {
    id: 'pharah',
    name: 'Pharah',
    nameJa: 'ファラ',
    role: 'damage',
    tier: 'B',
    metaScore: 72.4,
    winRate: 50.2,
    pickRate: 4.9,
    trend: 'stable',
    changeScore: -0.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['pharah'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 3, B: 7, C: 2, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.15,
      performanceMetric: { label: '直撃弾率', value: '31.2%' },
      counters: ['シンメトラ', 'ラインハルト'],
      synergies: ['マーシー']
    }
  },
  {
    id: 'echo',
    name: 'Echo',
    nameJa: 'エコー',
    role: 'damage',
    tier: 'B',
    metaScore: 76.1,
    winRate: 50.9,
    pickRate: 4.2,
    trend: 'stable',
    changeScore: 0.2,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['echo'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 4, B: 8, C: 0, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 3.25,
      performanceMetric: { label: 'フォーカシングビームキル', value: '6.9 / 10分' },
      counters: ['ラインハルト'],
      synergies: ['マーシー', 'ジュノ']
    }
  },
  {
    id: 'lucio',
    name: 'Lucio',
    nameJa: 'ルシオ',
    role: 'support',
    tier: 'B',
    metaScore: 76.8,
    winRate: 50.2,
    pickRate: 6.8,
    trend: 'falling',
    changeScore: -3.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['lucio'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 0, A: 4, B: 8, C: 1, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.95,
      performanceMetric: { label: 'スピード加速比率', value: '64%' },
      counters: ['ラインハルト'],
      synergies: ['ジャンカー・クイーン', 'ラマットラ']
    }
  },
  {
    id: 'brigitte',
    name: 'Brigitte',
    nameJa: 'ブリギッテ',
    role: 'support',
    tier: 'B',
    metaScore: 75.6,
    winRate: 51.1,
    pickRate: 4.8,
    trend: 'stable',
    changeScore: 0.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['brigitte'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 3, B: 8, C: 1, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.75,
      performanceMetric: { label: 'インスパイア発動率', value: '42%' },
      counters: ['トレーサー', 'ゲンジ', 'ダイブ全般'],
      synergies: ['アナ']
    }
  },

  // ==========================================
  // --- C TIER ---
  // ==========================================
  {
    id: 'mauga',
    name: 'Mauga',
    nameJa: 'マウガ',
    role: 'tank',
    tier: 'C',
    metaScore: 62.4,
    winRate: 48.6,
    pickRate: 3.2,
    trend: 'nerfed',
    changeScore: -6.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['mauga'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 1, B: 4, C: 7, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'All Ranks',
      kdRatio: 2.72,
      performanceMetric: { label: '自己回復量', value: '6,900 / 10分' },
      counters: ['ロードホッグ'],
      synergies: ['キリコ']
    }
  },
  {
    id: 'reinhardt',
    name: 'Reinhardt',
    nameJa: 'ラインハルト',
    role: 'tank',
    tier: 'C',
    metaScore: 56.8,
    winRate: 48.1,
    pickRate: 3.8,
    trend: 'falling',
    changeScore: -2.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['reinhardt'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 0, A: 0, B: 2, C: 10, D: 1 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.48,
      performanceMetric: { label: 'バリアブロック', value: '17,800 / 10分' },
      counters: ['ザリア (接近時)'],
      synergies: ['ルシオ', 'アナ']
    }
  },
  {
    id: 'orisa',
    name: 'Orisa',
    nameJa: 'オリーサ',
    role: 'tank',
    tier: 'C',
    metaScore: 58.2,
    winRate: 48.4,
    pickRate: 3.5,
    trend: 'stable',
    changeScore: -0.5,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['orisa'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 1, B: 3, C: 8, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.65,
      performanceMetric: { label: 'フォーティファイ軽減', value: '8,200 / 10分' },
      counters: ['ドゥームフィスト', 'ラインハルト'],
      synergies: ['バティスト']
    }
  },
  {
    id: 'soldier76',
    name: 'Soldier: 76',
    nameJa: 'ソルジャー76',
    role: 'damage',
    tier: 'C',
    metaScore: 61.2,
    winRate: 49.0,
    pickRate: 5.4,
    trend: 'stable',
    changeScore: -0.3,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['soldier76'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 1, B: 4, C: 7, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'All Ranks',
      kdRatio: 2.85,
      performanceMetric: { label: 'ロケット直撃率', value: '28%' },
      counters: ['ファラ'],
      synergies: ['マーシー']
    }
  },
  {
    id: 'mei',
    name: 'Mei',
    nameJa: 'メイ',
    role: 'damage',
    tier: 'C',
    metaScore: 59.8,
    winRate: 48.9,
    pickRate: 3.6,
    trend: 'stable',
    changeScore: 0.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['mei'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 0, B: 3, C: 9, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.70,
      performanceMetric: { label: 'アイスウォール分断キル', value: '4.8 / 10分' },
      counters: ['ラインハルト', 'D.Va'],
      synergies: ['ラマットラ']
    }
  },
  {
    id: 'torbjorn',
    name: 'Torbjorn',
    nameJa: 'トールビョーン',
    role: 'damage',
    tier: 'C',
    metaScore: 57.9,
    winRate: 48.7,
    pickRate: 3.1,
    trend: 'stable',
    changeScore: -0.2,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['torbjorn'] || '',
    influencerStats: {
      totalReviewers: 11,
      distribution: { S: 0, A: 0, B: 2, C: 8, D: 1 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'All Ranks',
      kdRatio: 2.60,
      performanceMetric: { label: 'タレット命中率', value: '88%' },
      counters: ['トレーサー', 'ゲンジ'],
      synergies: ['シグマ']
    }
  },
  {
    id: 'hanzo',
    name: 'Hanzo',
    nameJa: 'ハンゾー',
    role: 'damage',
    tier: 'C',
    metaScore: 56.1,
    winRate: 48.0,
    pickRate: 4.1,
    trend: 'falling',
    changeScore: -1.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['hanzo'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 0, B: 2, C: 9, D: 1 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.58,
      performanceMetric: { label: 'ヘッドショットキル', value: '5.2 / 10分' },
      counters: ['バスティオン'],
      synergies: ['ザリア']
    }
  },
  {
    id: 'junkrat',
    name: 'Junkrat',
    nameJa: 'ジャンクラット',
    role: 'damage',
    tier: 'C',
    metaScore: 55.4,
    winRate: 48.1,
    pickRate: 3.4,
    trend: 'stable',
    changeScore: -0.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['junkrat'] || '',
    influencerStats: {
      totalReviewers: 11,
      distribution: { S: 0, A: 0, B: 1, C: 9, D: 1 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'All Ranks',
      kdRatio: 2.54,
      performanceMetric: { label: '直撃弾率', value: '24.1%' },
      counters: ['ラインハルト'],
      synergies: ['メイ']
    }
  },
  {
    id: 'zenyatta',
    name: 'Zenyatta',
    nameJa: 'ゼニヤッタ',
    role: 'support',
    tier: 'C',
    metaScore: 61.5,
    winRate: 49.2,
    pickRate: 4.1,
    trend: 'falling',
    changeScore: -2.3,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['zenyatta'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 1, B: 3, C: 8, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.68,
      performanceMetric: { label: '不和オーブ付与キル', value: '11.8 / 10分' },
      counters: ['ロードホッグ', 'マウガ'],
      synergies: ['シグマ', 'トレーサー']
    }
  },
  {
    id: 'mercy',
    name: 'Mercy',
    nameJa: 'マーシー',
    role: 'support',
    tier: 'C',
    metaScore: 57.3,
    winRate: 48.0,
    pickRate: 7.2,
    trend: 'falling',
    changeScore: -1.9,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['mercy'] || '',
    influencerStats: {
      totalReviewers: 13,
      distribution: { S: 0, A: 1, B: 3, C: 9, D: 0 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'All Ranks',
      kdRatio: 1.82,
      performanceMetric: { label: '蘇生成功数', value: '5.1回 / 10分' },
      counters: ['なし'],
      synergies: ['アッシュ', 'ソジョーン', 'ファラ']
    }
  },

  // ==========================================
  // --- D TIER ---
  // ==========================================
  {
    id: 'roadhog',
    name: 'Roadhog',
    nameJa: 'ロードホッグ',
    role: 'tank',
    tier: 'D',
    metaScore: 42.1,
    winRate: 45.8,
    pickRate: 2.1,
    trend: 'falling',
    changeScore: -5.1,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['roadhog'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 0, B: 1, C: 3, D: 8 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.15,
      performanceMetric: { label: 'フック命中率', value: '48.2%' },
      counters: ['ドゥームフィスト'],
      synergies: ['キリコ']
    }
  },
  {
    id: 'widowmaker',
    name: 'Widowmaker',
    nameJa: 'ウィドウメイカー',
    role: 'damage',
    tier: 'D',
    metaScore: 46.5,
    winRate: 46.5,
    pickRate: 3.2,
    trend: 'nerfed',
    changeScore: -4.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['widowmaker'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 1, B: 2, C: 3, D: 6 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.38,
      performanceMetric: { label: 'クリティカルキル率', value: '62%' },
      counters: ['ファラ'],
      synergies: ['シグマ']
    }
  },
  {
    id: 'symmetra',
    name: 'Symmetra',
    nameJa: 'シンメトラ',
    role: 'damage',
    tier: 'D',
    metaScore: 42.0,
    winRate: 46.8,
    pickRate: 1.4,
    trend: 'falling',
    changeScore: -3.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['symmetra'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 0, B: 0, C: 4, D: 8 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.21,
      performanceMetric: { label: 'テレポーター利用回数', value: '12.4 / 10分' },
      counters: ['D.Va (狭所)'],
      synergies: ['ラインハルト']
    }
  },
  {
    id: 'moira',
    name: 'Moira',
    nameJa: 'モイラ',
    role: 'support',
    tier: 'D',
    metaScore: 45.2,
    winRate: 47.1,
    pickRate: 4.8,
    trend: 'falling',
    changeScore: -2.8,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['moira'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 0, B: 1, C: 4, D: 7 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.28,
      performanceMetric: { label: 'ヒールオーブ供給量', value: '7,400 / 10分' },
      counters: ['ゲンジ (削り)'],
      synergies: ['ルシオ']
    }
  },
  {
    id: 'lifeweaver',
    name: 'Lifeweaver',
    nameJa: 'ライフウィーバー',
    role: 'support',
    tier: 'D',
    metaScore: 43.8,
    winRate: 46.1,
    pickRate: 2.1,
    trend: 'falling',
    changeScore: -3.4,
    avatarUrl: OFFICIAL_HERO_PORTRAITS['lifeweaver'] || '',
    influencerStats: {
      totalReviewers: 12,
      distribution: { S: 0, A: 0, B: 0, C: 4, D: 8 },
      opinions: []
    },
    statsDetail: {
      rankTier: 'Master & GM',
      kdRatio: 2.10,
      performanceMetric: { label: '命の樹ヒール総量', value: '4,100 / 10分' },
      counters: ['ザリア (グラビトン回避)'],
      synergies: ['シグマ']
    }
  }
];
