import React, { useState } from 'react';
import type { HeroData, TierGrade } from '../types';
import { HeroAvatar } from './HeroAvatar';
import { X, ExternalLink, Shield, Swords, HeartHandshake, FileText, CheckCircle2 } from 'lucide-react';

interface HeroDetailModalProps {
  hero: HeroData | null;
  onClose: () => void;
}

export const HeroDetailModal: React.FC<HeroDetailModalProps> = ({ hero, onClose }) => {
  const [activeTab, setActiveTab] = useState<'opinions' | 'stats' | 'patch'>('opinions');

  if (!hero) return null;

  const roleNameJa = {
    tank: 'タンク',
    damage: 'ダメージ',
    support: 'サポート'
  }[hero.role];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* モーダルヘッダー */}
        <div className="modal-hero-header">
          <div className="header-bg-glow"></div>
          
          <div className="modal-hero-identity">
            <HeroAvatar
              name={hero.name}
              nameJa={hero.nameJa}
              role={hero.role}
              avatarUrl={hero.avatarUrl}
              size="xl"
            />
            <div className="identity-text">
              <div className="identity-role-chip font-display">
                <span className={`role-dot ${hero.role}`}></span>
                {roleNameJa} / {hero.name}
              </div>
              <h2 className="hero-title-name font-display">{hero.nameJa}</h2>
              <p className="hero-sub-stats">
                総合メタスコア: <strong>{hero.metaScore.toFixed(1)}</strong> / 100
              </p>
            </div>
          </div>

          <div className="modal-header-right">
            <div className={`meta-tier-banner tier-${hero.tier.toLowerCase()}`}>
              <span className="banner-tier-letter font-display">{hero.tier}</span>
              <span className="banner-tier-text">TIER</span>
            </div>
            <button
              id="close-modal-btn"
              className="modal-close-btn"
              onClick={onClose}
              title="閉じる"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* クイックステータスバー */}
        <div className="modal-quick-stats">
          <div className="qstat-item">
            <span className="qstat-label">勝率 (GM/マスター)</span>
            <span className={`qstat-val font-display ${hero.winRate >= 52 ? 'highlight-pos' : ''}`}>
              {hero.winRate}%
            </span>
          </div>
          <div className="qstat-item">
            <span className="qstat-label">ピック率</span>
            <span className="qstat-val font-display">{hero.pickRate}%</span>
          </div>
          <div className="qstat-item">
            <span className="qstat-label">K/D レシオ</span>
            <span className="qstat-val font-display">{hero.statsDetail.kdRatio}</span>
          </div>
          <div className="qstat-item">
            <span className="qstat-label">{hero.statsDetail.performanceMetric.label}</span>
            <span className="qstat-val font-display">{hero.statsDetail.performanceMetric.value}</span>
          </div>
        </div>

        {/* タブナビゲーション */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'opinions' ? 'active' : ''}`}
            onClick={() => setActiveTab('opinions')}
          >
            <Shield size={16} />
            <span>プロ・配信者の評価 ({hero.influencerStats.opinions.length || hero.influencerStats.totalReviewers}名)</span>
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'stats' ? 'active' : ''}`}
            onClick={() => setActiveTab('stats')}
          >
            <Swords size={16} />
            <span>相性 & シナジー</span>
          </button>
          {hero.patchNotes && (
            <button
              className={`modal-tab-btn ${activeTab === 'patch' ? 'active' : ''}`}
              onClick={() => setActiveTab('patch')}
            >
              <FileText size={16} />
              <span>パッチノート変更点</span>
            </button>
          )}
        </div>

        {/* タブコンテンツ */}
        <div className="modal-tab-body">
          {activeTab === 'opinions' && (
            <div className="tab-pane-opinions">
              {/* ティア分布グラフ */}
              <div className="opinions-summary-box">
                <h4>配信者・プロのティア判定分布 (計{hero.influencerStats.totalReviewers}名の集計)</h4>
                <div className="distribution-bar-large">
                  {(['S', 'A', 'B', 'C', 'D'] as TierGrade[]).map((tier) => {
                    const count = hero.influencerStats.distribution[tier] || 0;
                    const percent = Math.round((count / hero.influencerStats.totalReviewers) * 100);
                    return (
                      <div
                        key={tier}
                        className={`dist-segment tier-${tier.toLowerCase()}`}
                        style={{ width: `${Math.max(percent, count > 0 ? 8 : 0)}%` }}
                        title={`${tier}評価: ${count}名 (${percent}%)`}
                      >
                        {count > 0 && <span>{tier}: {count}人</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 各クリエイターの個別コメント */}
              <div className="creator-reviews-list">
                {hero.influencerStats.opinions.length > 0 ? (
                  hero.influencerStats.opinions.map((op) => (
                    <div key={op.id} className="creator-card">
                      <div className="creator-card-header">
                        <div className="creator-profile">
                          <img
                            src={op.avatarUrl}
                            alt={op.creatorName}
                            className="creator-avatar"
                          />
                          <div>
                            <div className="creator-name-row">
                              <strong>{op.creatorName}</strong>
                              <span className="platform-tag">{op.platform}</span>
                            </div>
                            <span className="creator-role-title">{op.creatorTitle}</span>
                          </div>
                        </div>

                        <div className="creator-tier-verdict">
                          <span className="verdict-label">判定:</span>
                          <span className={`verdict-tier-badge tier-${op.assignedTier.toLowerCase()} font-display`}>
                            {op.assignedTier} TIER
                          </span>
                        </div>
                      </div>

                      <div className="creator-comment-bubble">
                        <p>「{op.comment}」</p>
                      </div>

                      <div className="creator-card-footer">
                        <span className="comment-date">投稿日: {op.date}</span>
                        <a
                          href={op.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="source-external-link"
                        >
                          元動画・配信を見る <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="no-detailed-comments">
                    <p>このヒーローはAI画像解析によるティア集計（{hero.influencerStats.totalReviewers}名の合意データ）が登録されています。個別詳細コメントは順次更新予定です。</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'stats' && (
            <div className="tab-pane-stats">
              <div className="synergy-grid">
                <div className="synergy-box counters">
                  <div className="box-title">
                    <Swords size={18} className="icon-counter" />
                    <h4>有利なマッチアップ (カウンター対象)</h4>
                  </div>
                  <ul className="hero-tag-list">
                    {hero.statsDetail.counters.map((c) => (
                      <li key={c} className="hero-tag-item counter">
                        <CheckCircle2 size={14} />
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="box-desc">相手にこれらのヒーローがいる場合、積極的に有利を取りやすい相性関係です。</p>
                </div>

                <div className="synergy-box synergies">
                  <div className="box-title">
                    <HeartHandshake size={18} className="icon-synergy" />
                    <h4>相性の良い味方 (推奨シナジー)</h4>
                  </div>
                  <ul className="hero-tag-list">
                    {hero.statsDetail.synergies.map((s) => (
                      <li key={s} className="hero-tag-item synergy">
                        <CheckCircle2 size={14} />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="box-desc">味方にこの構成がいると真価を発揮しやすく、勝率が向上する傾向があります。</p>
                </div>
              </div>

              <div className="rank-sample-note">
                <span>統計サンプル対象: {hero.statsDetail.rankTier} / Overbuff & 公式Leaderboardデータ集計</span>
              </div>
            </div>
          )}

          {activeTab === 'patch' && hero.patchNotes && (
            <div className="tab-pane-patch">
              <div className="patch-note-card">
                <div className="patch-version-tag font-display">{hero.patchNotes.patch} 調整内容</div>
                <ul className="patch-changes-list">
                  {hero.patchNotes.changes.map((change, i) => (
                    <li key={i}>
                      <span className="bullet">⚡</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
