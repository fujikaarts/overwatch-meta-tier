import React, { useState } from 'react';
import type { HeroData, HeroRole } from '../types';
import { HeroAvatar } from './HeroAvatar';
import { ArrowUpDown, Flame, Zap, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TableViewProps {
  heroes: HeroData[];
  onSelectHero: (hero: HeroData) => void;
}

type SortField = 'metaScore' | 'winRate' | 'pickRate' | 'name' | 'tier';
type SortOrder = 'asc' | 'desc';

export const TableView: React.FC<TableViewProps> = ({ heroes, onSelectHero }) => {
  const [sortField, setSortField] = useState<SortField>('metaScore');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const sortedHeroes = [...heroes].sort((a, b) => {
    let comp = 0;
    if (sortField === 'metaScore') comp = a.metaScore - b.metaScore;
    else if (sortField === 'winRate') comp = a.winRate - b.winRate;
    else if (sortField === 'pickRate') comp = a.pickRate - b.pickRate;
    else if (sortField === 'name') comp = a.nameJa.localeCompare(b.nameJa);
    else if (sortField === 'tier') {
      const order = { S: 5, A: 4, B: 3, C: 2, D: 1 };
      comp = order[a.tier] - order[b.tier];
    }
    return sortOrder === 'desc' ? -comp : comp;
  });

  const getRoleBadge = (role: HeroRole) => {
    switch (role) {
      case 'tank':
        return <span className="table-role-badge tank">TANK</span>;
      case 'damage':
        return <span className="table-role-badge damage">DAMAGE</span>;
      case 'support':
        return <span className="table-role-badge support">SUPPORT</span>;
    }
  };

  const getTierBadge = (tier: string) => {
    return <span className={`table-tier-badge tier-${tier.toLowerCase()} font-display`}>{tier}</span>;
  };

  return (
    <div className="table-view-container glass-panel">
      <div className="table-header-info">
        <h3>全ヒーロー総合ランキング・スタッツ詳細</h3>
        <p>各カラムをクリックして並び替えが可能です。行をクリックすると各配信者の所見と詳細データを閲覧できます。</p>
      </div>

      <div className="table-responsive-wrapper">
        <table className="meta-stats-table">
          <thead>
            <tr>
              <th className="th-rank">#</th>
              <th className="th-hero" onClick={() => handleSort('name')}>
                ヒーロー <ArrowUpDown size={13} />
              </th>
              <th className="th-role">ロール</th>
              <th className="th-tier" onClick={() => handleSort('tier')}>
                ティア <ArrowUpDown size={13} />
              </th>
              <th className="th-score" onClick={() => handleSort('metaScore')}>
                メタスコア <ArrowUpDown size={13} />
              </th>
              <th className="th-winrate" onClick={() => handleSort('winRate')}>
                勝率 (GM帯) <ArrowUpDown size={13} />
              </th>
              <th className="th-pickrate" onClick={() => handleSort('pickRate')}>
                ピック率 <ArrowUpDown size={13} />
              </th>
              <th className="th-distribution">配信者評価内訳 (S/A/B/C/D)</th>
              <th className="th-trend">トレンド</th>
            </tr>
          </thead>
          <tbody>
            {sortedHeroes.map((hero, index) => (
              <tr
                key={hero.id}
                id={`table-row-${hero.id}`}
                className="table-data-row"
                onClick={() => onSelectHero(hero)}
              >
                <td className="td-rank font-display">{index + 1}</td>
                <td className="td-hero">
                  <div className="table-hero-cell">
                    <HeroAvatar
                      name={hero.name}
                      nameJa={hero.nameJa}
                      role={hero.role}
                      avatarUrl={hero.avatarUrl}
                      size="sm"
                    />
                    <div className="table-hero-names">
                      <span className="hero-name-primary">{hero.nameJa}</span>
                      <span className="hero-name-sub">{hero.name}</span>
                    </div>
                  </div>
                </td>
                <td className="td-role">{getRoleBadge(hero.role)}</td>
                <td className="td-tier">{getTierBadge(hero.tier)}</td>
                <td className="td-score">
                  <div className="score-cell-wrap">
                    <div className="score-val font-display">{hero.metaScore.toFixed(1)}</div>
                    <div className="score-bar-bg">
                      <div
                        className="score-bar-fill"
                        style={{ width: `${hero.metaScore}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="td-winrate">
                  <span className={`stat-highlight ${hero.winRate >= 52 ? 'positive' : hero.winRate < 48 ? 'negative' : ''}`}>
                    {hero.winRate}%
                  </span>
                </td>
                <td className="td-pickrate">
                  <span>{hero.pickRate}%</span>
                </td>
                <td className="td-distribution">
                  <div className="distribution-mini-bar" title={`S:${hero.influencerStats.distribution.S} A:${hero.influencerStats.distribution.A} B:${hero.influencerStats.distribution.B} C:${hero.influencerStats.distribution.C} D:${hero.influencerStats.distribution.D}`}>
                    <span className="dist-chip s font-display">S:{hero.influencerStats.distribution.S}</span>
                    <span className="dist-chip a font-display">A:{hero.influencerStats.distribution.A}</span>
                    <span className="dist-chip b font-display">B:{hero.influencerStats.distribution.B}</span>
                    {hero.influencerStats.distribution.C > 0 && <span className="dist-chip c font-display">C:{hero.influencerStats.distribution.C}</span>}
                    {hero.influencerStats.distribution.D > 0 && <span className="dist-chip d font-display">D:{hero.influencerStats.distribution.D}</span>}
                  </div>
                </td>
                <td className="td-trend">
                  {hero.trend === 'buffed' && <span className="tag-buff"><Flame size={12} /> バフ</span>}
                  {hero.trend === 'nerfed' && <span className="tag-nerf"><Zap size={12} /> ナーフ</span>}
                  {hero.trend === 'rising' && <span className="tag-rise"><TrendingUp size={12} /> +{hero.changeScore}</span>}
                  {hero.trend === 'falling' && <span className="tag-fall"><TrendingDown size={12} /> {hero.changeScore}</span>}
                  {hero.trend === 'stable' && <span className="tag-stable"><Minus size={12} /> 維持</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
