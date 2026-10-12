import React from 'react';
import { Layers, Database, HelpCircle, Search, ExternalLink, Activity, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentTab: 'tier' | 'table' | 'sources' | 'logic' | 'vision';
  setCurrentTab: (tab: 'tier' | 'table' | 'sources' | 'logic' | 'vision') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedPatch: string;
  setSelectedPatch: (p: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  searchQuery,
  setSearchQuery,
  selectedPatch,
  setSelectedPatch
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-top-banner">
        <div className="banner-content">
          <span className="live-dot-pulse"></span>
          <span className="banner-text">
            <strong>S13 MID-PATCH 環境分析中</strong> — プロ・上位配信者の最新ティアリスト & Overbuff/公式GM帯統計データを自動集計
          </span>
          <span className="banner-stats">
            <Activity size={13} /> 解析ティアリスト: 14本 | 統計サンプル: 450,000+ matches
          </span>
        </div>
      </div>

      <div className="navbar-main">
        <div className="navbar-left">
          <div className="brand-logo" onClick={() => setCurrentTab('tier')}>
            <div className="logo-symbol">
              <svg viewBox="0 0 100 100" className="ow-svg-icon">
                <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" />
                <path d="M28 44 L50 22 L72 44 L60 44 L50 34 L40 44 Z" fill="currentColor" />
                <circle cx="50" cy="65" r="12" fill="#00e5ff" />
              </svg>
            </div>
            <div className="logo-text-group">
              <span className="brand-title font-display">OW META TIER</span>
              <span className="brand-subtitle">METAGAME CONSENSUS HUB</span>
            </div>
          </div>

          <div className="patch-selector-box">
            <span className="patch-label">PATCH:</span>
            <select
              id="patch-select"
              value={selectedPatch}
              onChange={(e) => setSelectedPatch(e.target.value)}
              className="patch-select"
            >
              <option value="s13-mid">Season 13: Mid-Patch (現行)</option>
              <option value="s13-launch">Season 13: Launch</option>
              <option value="s12-mid">Season 12: Mid-Patch</option>
            </select>
          </div>
        </div>

        <div className="navbar-center">
          <nav className="nav-tabs">
            <button
              id="tab-tier-btn"
              className={`nav-tab-btn ${currentTab === 'tier' ? 'active' : ''}`}
              onClick={() => setCurrentTab('tier')}
            >
              <Layers size={16} />
              <span>メタティアリスト</span>
            </button>
            <button
              id="tab-table-btn"
              className={`nav-tab-btn ${currentTab === 'table' ? 'active' : ''}`}
              onClick={() => setCurrentTab('table')}
            >
              <Database size={16} />
              <span>ランキング一覧</span>
            </button>
            <button
              id="tab-sources-btn"
              className={`nav-tab-btn ${currentTab === 'sources' ? 'active' : ''}`}
              onClick={() => setCurrentTab('sources')}
            >
              <ExternalLink size={16} />
              <span>収集元配信者 (14)</span>
            </button>
            <button
              id="tab-logic-btn"
              className={`nav-tab-btn ${currentTab === 'logic' ? 'active' : ''}`}
              onClick={() => setCurrentTab('logic')}
            >
              <HelpCircle size={16} />
              <span>算出ロジック</span>
            </button>
            <button
              id="tab-vision-btn"
              className={`nav-tab-btn vision-highlight ${currentTab === 'vision' ? 'active' : ''}`}
              onClick={() => setCurrentTab('vision')}
            >
              <Sparkles size={16} className="text-orange" />
              <span>AI画像解析 PoC (Beta)</span>
            </button>
          </nav>
        </div>

        <div className="navbar-right">
          <div className="search-bar-wrapper">
            <Search size={15} className="search-icon" />
            <input
              id="hero-search-input"
              type="text"
              placeholder="ヒーロー名で検索..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                title="クリア"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
