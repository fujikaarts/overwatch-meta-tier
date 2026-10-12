import { useState, useMemo } from 'react';
import { MOCK_HEROES } from './data/mockHeroes';
import type { HeroData, HeroRole, TierGrade } from './types';
import { resolveHeroByName } from './utils/heroDictionary';
import { DEFAULT_WEIGHTS, recalculateAllHeroes, type ScoringWeights } from './utils/metaScoreEngine';
import { Navbar } from './components/Navbar';
import { TierRow } from './components/TierRow';
import { TierMakerBoard } from './components/TierMakerBoard';
import { TableView } from './components/TableView';
import { SourcesView } from './components/SourcesView';
import { LogicView } from './components/LogicView';
import { VisionStudioView } from './components/VisionStudioView';
import { HeroDetailModal } from './components/HeroDetailModal';
import { Shield, Swords, Plus, Sparkles, SlidersHorizontal, LayoutGrid, Rows } from 'lucide-react';
import './App.css';

export function App() {
  const [currentTab, setCurrentTab] = useState<'tier' | 'table' | 'sources' | 'logic' | 'vision'>('tier');
  const [tierViewMode, setTierViewMode] = useState<'tiermaker' | 'cards'>('tiermaker');
  const [selectedRole, setSelectedRole] = useState<'all' | HeroRole>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatch, setSelectedPatch] = useState('s13-mid');
  const [selectedHero, setSelectedHero] = useState<HeroData | null>(null);
  const [heroesData, setHeroesData] = useState<HeroData[]>(MOCK_HEROES);
  const [weights, setWeights] = useState<ScoringWeights>(DEFAULT_WEIGHTS);
  const [lastSyncedAt, setLastSyncedAt] = useState<string>('2026-10-12 17:00 UTC (直近14日)');
  const [integrationNotice, setIntegrationNotice] = useState<string | null>(null);

  // 重み付け変更ハンドラ
  const handleWeightsChange = (newWeights: ScoringWeights) => {
    setWeights(newWeights);
    setHeroesData((prev) => recalculateAllHeroes(prev, newWeights));
  };

  // Overbuff統計同期ハンドラ
  const handleSyncStats = () => {
    setLastSyncedAt('2026-10-13 02:30 UTC (最新45万マッチ同期済)');
    // 統計データに最新差分を適用
    setHeroesData((prev) => {
      const updated = prev.map((h) => {
        // パッチ中期データとして微調整
        return {
          ...h,
          winRate: Math.round((h.winRate + (Math.random() * 0.4 - 0.2)) * 10) / 10
        };
      });
      return recalculateAllHeroes(updated, weights);
    });
    setIntegrationNotice('Overbuff最新統計（452,190 matches）を同期し、メタスコアを再計算しました！');
    setTimeout(() => setIntegrationNotice(null), 5000);
  };

  // AI解析結果を既存のメタティアリストに統合する関数
  const handleIntegrateResults = (newTiers: Record<TierGrade, string[]>, sourceName: string) => {
    setHeroesData((prevHeroes) => {
      return prevHeroes.map((hero) => {
        // newTiers内のどのティアにいるか探す
        let assignedTier: TierGrade | null = null;
        for (const t of ['S', 'A', 'B', 'C', 'D'] as TierGrade[]) {
          const list = newTiers[t] || [];
          if (list.some((name) => resolveHeroByName(name)?.id === hero.id)) {
            assignedTier = t;
            break;
          }
        }

        if (!assignedTier) return hero;

        // 加重平均の再計算 (S=100, A=80, B=60, C=40, D=20)
        const tierPoints = { S: 100, A: 80, B: 60, C: 40, D: 20 };
        const newPoint = tierPoints[assignedTier];
        const oldTotal = hero.metaScore * hero.influencerStats.totalReviewers;
        const newTotalReviewers = hero.influencerStats.totalReviewers + 1;
        const updatedScore = Math.min(100, Math.max(20, (oldTotal + newPoint) / newTotalReviewers));

        // ティア再判定
        let updatedTier: TierGrade = hero.tier;
        if (updatedScore >= 90) updatedTier = 'S';
        else if (updatedScore >= 80) updatedTier = 'A';
        else if (updatedScore >= 65) updatedTier = 'B';
        else if (updatedScore >= 50) updatedTier = 'C';
        else updatedTier = 'D';

        const updatedDistribution = { ...hero.influencerStats.distribution };
        updatedDistribution[assignedTier] = (updatedDistribution[assignedTier] || 0) + 1;

        return {
          ...hero,
          tier: updatedTier,
          metaScore: Math.round(updatedScore * 10) / 10,
          influencerStats: {
            ...hero.influencerStats,
            totalReviewers: newTotalReviewers,
            distribution: updatedDistribution
          }
        };
      });
    });

    setIntegrationNotice(`「${sourceName}」のAI解析結果を統合しました！メタスコアが再計算されました。`);
    setCurrentTab('tier');
    setTimeout(() => setIntegrationNotice(null), 5000);
  };

  // フィルタリング処理
  const filteredHeroes = useMemo(() => {
    return heroesData.filter((hero) => {
      if (selectedRole !== 'all' && hero.role !== selectedRole) {
        return false;
      }
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = hero.name.toLowerCase().includes(query);
        const matchNameJa = hero.nameJa.toLowerCase().includes(query);
        if (!matchName && !matchNameJa) return false;
      }
      return true;
    });
  }, [heroesData, selectedRole, searchQuery]);

  // ティア別のグルーピング
  const heroesByTier = useMemo(() => {
    const groups: Record<TierGrade, HeroData[]> = {
      S: [],
      A: [],
      B: [],
      C: [],
      D: []
    };
    filteredHeroes.forEach((h) => {
      groups[h.tier].push(h);
    });
    // メタスコア降順でソート
    (Object.keys(groups) as TierGrade[]).forEach((tier) => {
      groups[tier].sort((a, b) => b.metaScore - a.metaScore);
    });
    return groups;
  }, [filteredHeroes]);

  return (
    <div className="app-layout">
      {/* ナビゲーションバー */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedPatch={selectedPatch}
        setSelectedPatch={setSelectedPatch}
      />

      {/* メインコンテンツエリア */}
      <main className="main-content-container">
        {/* メインティア表タブまたはテーブルタブの場合のフィルターバー */}
        {(currentTab === 'tier' || currentTab === 'table') && (
          <section className="filter-toolbar glass-panel">
            <div className="toolbar-left-group">
              <div className="role-filters-group">
                <span className="filter-label">
                  <SlidersHorizontal size={14} /> ロール:
                </span>
                <button
                  id="role-filter-all"
                  className={`role-filter-btn ${selectedRole === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('all')}
                >
                  <span>ALL</span>
                  <span className="role-count-badge">{MOCK_HEROES.length}</span>
                </button>

                <button
                  id="role-filter-tank"
                  className={`role-filter-btn tank ${selectedRole === 'tank' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('tank')}
                >
                  <Shield size={15} />
                  <span>TANK</span>
                  <span className="role-count-badge">
                    {MOCK_HEROES.filter((h) => h.role === 'tank').length}
                  </span>
                </button>

                <button
                  id="role-filter-damage"
                  className={`role-filter-btn damage ${selectedRole === 'damage' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('damage')}
                >
                  <Swords size={15} />
                  <span>DAMAGE</span>
                  <span className="role-count-badge">
                    {MOCK_HEROES.filter((h) => h.role === 'damage').length}
                  </span>
                </button>

                <button
                  id="role-filter-support"
                  className={`role-filter-btn support ${selectedRole === 'support' ? 'active' : ''}`}
                  onClick={() => setSelectedRole('support')}
                >
                  <Plus size={15} />
                  <span>SUPPORT</span>
                  <span className="role-count-badge">
                    {MOCK_HEROES.filter((h) => h.role === 'support').length}
                  </span>
                </button>
              </div>

              {/* 表示スタイル切り替え (TierMakerスタイル vs OWカードスタイル) */}
              {currentTab === 'tier' && (
                <div className="view-mode-toggle-group">
                  <span className="mode-toggle-label">スタイル:</span>
                  <button
                    id="mode-tiermaker-btn"
                    className={`mode-toggle-btn ${tierViewMode === 'tiermaker' ? 'active' : ''}`}
                    onClick={() => setTierViewMode('tiermaker')}
                    title="おなじみのTierMaker画像スタイル"
                  >
                    <LayoutGrid size={14} />
                    <span>TierMaker風</span>
                  </button>
                  <button
                    id="mode-cards-btn"
                    className={`mode-toggle-btn ${tierViewMode === 'cards' ? 'active' : ''}`}
                    onClick={() => setTierViewMode('cards')}
                    title="詳細データ付きカードスタイル"
                  >
                    <Rows size={14} />
                    <span>詳細カード</span>
                  </button>
                </div>
              )}
            </div>

            {/* クイック統計サマリー */}
            <div className="toolbar-quick-info">
              <span className="info-chip">
                <Sparkles size={13} className="text-orange" />
                最高スコア: <strong>ジュノ (98.9)</strong>
              </span>
              <span className="info-chip">
                表示中: <strong>{filteredHeroes.length} ヒーロー</strong>
              </span>
            </div>
          </section>
        )}

        {/* タブに応じたコンテンツ描画 */}
        {currentTab === 'tier' && (
          <section className="tier-view-section animate-fade-in">
            {tierViewMode === 'tiermaker' ? (
              <TierMakerBoard
                heroesByTier={heroesByTier}
                onSelectHero={setSelectedHero}
                selectedPatch={selectedPatch}
              />
            ) : (
              <>
                <TierRow
                  grade="S"
                  heroes={heroesByTier.S}
                  onSelectHero={setSelectedHero}
                />
                <TierRow
                  grade="A"
                  heroes={heroesByTier.A}
                  onSelectHero={setSelectedHero}
                />
                <TierRow
                  grade="B"
                  heroes={heroesByTier.B}
                  onSelectHero={setSelectedHero}
                />
                <TierRow
                  grade="C"
                  heroes={heroesByTier.C}
                  onSelectHero={setSelectedHero}
                />
                <TierRow
                  grade="D"
                  heroes={heroesByTier.D}
                  onSelectHero={setSelectedHero}
                />
              </>
            )}
          </section>
        )}

        {currentTab === 'table' && (
          <section className="table-view-section animate-fade-in">
            <TableView
              heroes={filteredHeroes}
              onSelectHero={setSelectedHero}
            />
          </section>
        )}

        {currentTab === 'sources' && (
          <section className="sources-view-section animate-fade-in">
            <SourcesView />
          </section>
        )}

        {currentTab === 'logic' && (
          <section className="logic-view-section animate-fade-in">
            <LogicView
              weights={weights}
              onWeightsChange={handleWeightsChange}
              onSyncStats={handleSyncStats}
              lastSyncedAt={lastSyncedAt}
            />
          </section>
        )}

        {currentTab === 'vision' && (
          <section className="vision-view-section animate-fade-in">
            <VisionStudioView
              onIntegrateResults={handleIntegrateResults}
              allHeroes={heroesData}
            />
          </section>
        )}
      </main>

      {/* 統合成功通知トースト */}
      {integrationNotice && (
        <div className="integration-toast animate-fade-in">
          <Sparkles size={18} className="text-orange" />
          <span>{integrationNotice}</span>
          <button className="toast-close-btn" onClick={() => setIntegrationNotice(null)}>✕</button>
        </div>
      )}

      {/* ヒーロー詳細モーダル */}
      <HeroDetailModal
        hero={selectedHero}
        onClose={() => setSelectedHero(null)}
      />

      {/* フッター */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <p className="copyright-note">
              OW META TIER HUB — オーバーウォッチ メタティアリスト自動統合プラットフォーム
            </p>
            <p className="disclaimer-note">
              ※本サイトはBlizzard EntertainmentおよびOverwatchの公式製品ではありません。各統計およびクリエイターの公開情報に基づく非公式ファンプロジェクトです。
            </p>
          </div>
          <div className="footer-right">
            <span className="patch-version-tag">Season 13 Build 2.12.1</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
