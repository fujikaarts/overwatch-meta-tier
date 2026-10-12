import React from 'react';
import type { HeroData, TierGrade } from '../types';
import { HeroAvatar } from './HeroAvatar';
import { TrendingUp, TrendingDown, Minus, Flame, Zap } from 'lucide-react';

interface TierRowProps {
  grade: TierGrade;
  heroes: HeroData[];
  onSelectHero: (hero: HeroData) => void;
}

const TIER_META = {
  S: {
    label: 'S TIER',
    sublabel: 'OVERPOWERED / MUST PICK',
    scoreRange: '90 - 100',
    cssClass: 'tier-row-s'
  },
  A: {
    label: 'A TIER',
    sublabel: 'STRONG / META MAINSTAY',
    scoreRange: '80 - 89',
    cssClass: 'tier-row-a'
  },
  B: {
    label: 'B TIER',
    sublabel: 'BALANCED / SITUATIONAL',
    scoreRange: '65 - 79',
    cssClass: 'tier-row-b'
  },
  C: {
    label: 'C TIER',
    sublabel: 'UNDERPERFORMING',
    scoreRange: '50 - 64',
    cssClass: 'tier-row-c'
  },
  D: {
    label: 'D TIER',
    sublabel: 'WEAK / NEEDS BUFF',
    scoreRange: '< 50',
    cssClass: 'tier-row-d'
  }
};

export const TierRow: React.FC<TierRowProps> = ({
  grade,
  heroes,
  onSelectHero
}) => {
  const meta = TIER_META[grade];

  return (
    <div className={`tier-row-container ${meta.cssClass}`} id={`tier-row-${grade.toLowerCase()}`}>
      {/* ティアヘッダー (左側) */}
      <div className="tier-grade-header">
        <div className="tier-letter font-display">{grade}</div>
        <div className="tier-info">
          <span className="tier-label">{meta.label}</span>
          <span className="tier-desc">{meta.sublabel}</span>
          <span className="tier-score-range">SCORE: {meta.scoreRange}</span>
        </div>
      </div>

      {/* ヒーローカードリスト (右側) */}
      <div className="tier-heroes-track">
        {heroes.length > 0 ? (
          heroes.map((hero) => (
            <div
              key={hero.id}
              id={`hero-card-${hero.id}`}
              className="hero-card"
              onClick={() => onSelectHero(hero)}
              title={`${hero.nameJa} (${hero.name}) の詳細を表示`}
            >
              {/* カード上部バッジ */}
              <div className="card-top-badges">
                <span className="meta-score-badge font-display">
                  {hero.metaScore.toFixed(1)}
                </span>
                
                {hero.trend === 'buffed' && (
                  <span className="trend-tag buffed" title="パッチでバフ">
                    <Flame size={11} /> BUFF
                  </span>
                )}
                {hero.trend === 'nerfed' && (
                  <span className="trend-tag nerfed" title="パッチでナーフ">
                    <Zap size={11} /> NERF
                  </span>
                )}
                {hero.trend === 'rising' && (
                  <span className="trend-tag rising" title="メタ急上昇">
                    <TrendingUp size={11} /> +{hero.changeScore}
                  </span>
                )}
                {hero.trend === 'falling' && (
                  <span className="trend-tag falling" title="低下傾向">
                    <TrendingDown size={11} /> {hero.changeScore}
                  </span>
                )}
                {hero.trend === 'stable' && (
                  <span className="trend-tag stable" title="安定">
                    <Minus size={11} />
                  </span>
                )}
              </div>

              {/* ヒーロー画像 */}
              <div className="card-avatar-wrap">
                <HeroAvatar
                  name={hero.name}
                  nameJa={hero.nameJa}
                  role={hero.role}
                  avatarUrl={hero.avatarUrl}
                  size="lg"
                />
              </div>

              {/* 名前 */}
              <div className="card-name-group">
                <div className="card-name-ja">{hero.nameJa}</div>
                <div className="card-name-en">{hero.name}</div>
              </div>

              {/* 簡易スタッツ */}
              <div className="card-stats-row">
                <div className="stat-pill" title="勝率">
                  <span className="stat-pill-label">勝率</span>
                  <span className={`stat-pill-val ${hero.winRate >= 52 ? 'high' : hero.winRate < 48 ? 'low' : ''}`}>
                    {hero.winRate}%
                  </span>
                </div>
                <div className="stat-pill" title="ピック率">
                  <span className="stat-pill-label">ピック</span>
                  <span className="stat-pill-val">{hero.pickRate}%</span>
                </div>
              </div>

              {/* 配信者S/A票ハイライト */}
              <div className="card-pro-consensus">
                <span className="consensus-text">
                  プロ評価: <strong>{hero.influencerStats.distribution[grade]}名</strong> が{grade}指定
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="tier-empty-slot">
            <span>該当するヒーローはいません</span>
          </div>
        )}
      </div>
    </div>
  );
};
