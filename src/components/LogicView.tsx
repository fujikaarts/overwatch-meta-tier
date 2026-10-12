import React, { useState } from 'react';
import { DEFAULT_WEIGHTS, type ScoringWeights } from '../utils/metaScoreEngine';
import { Eye, BarChart3, Calculator, Sparkles, CheckCircle2, RefreshCw, Sliders, Database } from 'lucide-react';

interface LogicViewProps {
  weights?: ScoringWeights;
  onWeightsChange: (newWeights: ScoringWeights) => void;
  onSyncStats: () => void;
  lastSyncedAt?: string;
}

export const LogicView: React.FC<LogicViewProps> = ({
  weights = DEFAULT_WEIGHTS,
  onWeightsChange,
  onSyncStats,
  lastSyncedAt = '2026-10-12 17:00 UTC (直近14日)'
}) => {
  const currentWeights = weights || DEFAULT_WEIGHTS;
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  const handleRunSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      onSyncStats();
      setTimeout(() => setSyncSuccess(false), 4000);
    }, 1200);
  };

  const handleProSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const proVal = parseFloat(e.target.value);
    const statVal = Math.round((1.0 - proVal) * 100) / 100;
    onWeightsChange({
      ...currentWeights,
      proWeight: proVal,
      statWeight: statVal
    });
  };

  const setPreset = (pro: number, stat: number) => {
    onWeightsChange({
      ...currentWeights,
      proWeight: pro,
      statWeight: stat
    });
  };

  return (
    <div className="logic-view-container glass-panel">
      {/* ヘッダー */}
      <div className="logic-hero-section">
        <div className="studio-title-badge">
          <Calculator size={14} /> PHASE 3: STATS ENGINE & SCORING LOGIC
        </div>
        <h2>統計データ連携 & メタ集計エンジン</h2>
        <p>
          本サイトは、プロ・配信者の定性的な所見（合意スコア）と、Overbuff等の膨大なマッチログ（高レート帯統計）を
          ベイズ推定モデルで精密に統合した「ハイブリッド・メタスコア」を算出しています。
        </p>
      </div>

      {/* フェーズ3のインタラクティブ・シミュレーターパネル */}
      <div className="engine-interactive-card">
        <div className="engine-card-header">
          <div className="engine-title-wrap">
            <Sliders size={20} className="text-orange" />
            <div>
              <h3>集計ブレンド比率 シミュレーター</h3>
              <p>スライダーを調整すると、サイト全体のメタスコアとティア判定（S〜D）がリアルタイムに再計算されます。</p>
            </div>
          </div>

          {/* クローラー同期ボタン */}
          <button
            id="sync-overbuff-btn"
            className={`sync-stats-btn ${isSyncing ? 'syncing' : ''}`}
            onClick={handleRunSync}
            disabled={isSyncing}
          >
            <RefreshCw size={14} className={isSyncing ? 'spin-icon' : ''} />
            <span>{isSyncing ? 'Overbuff同期中...' : 'Overbuff最新統計を同期'}</span>
          </button>
        </div>

        {/* クローラー同期ステータス */}
        <div className="crawler-status-bar">
          <div className="status-item">
            <Database size={14} />
            <span>対象データソース: <strong>Overbuff (GM & Champion帯)</strong></span>
          </div>
          <div className="status-item">
            <span>サンプル数: <strong>452,190 matches</strong></span>
          </div>
          <div className="status-item">
            <span>最終同期: <strong>{lastSyncedAt}</strong></span>
          </div>
          {syncSuccess && (
            <div className="sync-success-pill animate-fade-in">
              <CheckCircle2 size={13} /> 最新差分（45万マッチ）を適用完了！
            </div>
          )}
        </div>

        {/* スライダーコントロール */}
        <div className="slider-control-box">
          <div className="slider-labels-row">
            <div className="slider-side pro">
              <span className="side-title">プロ・配信者合意比率</span>
              <span className="side-percent font-display">{Math.round(currentWeights.proWeight * 100)}%</span>
            </div>
            <div className="slider-side stat">
              <span className="side-title">高レート統計データ比率</span>
              <span className="side-percent font-display">{Math.round(currentWeights.statWeight * 100)}%</span>
            </div>
          </div>

          <input
            id="pro-stat-slider"
            type="range"
            min="0.10"
            max="0.90"
            step="0.05"
            value={currentWeights.proWeight}
            onChange={handleProSliderChange}
            className="dual-slider"
          />

          <div className="presets-row">
            <span className="preset-label">推奨プリセット:</span>
            <button
              className={`preset-btn ${currentWeights.proWeight === 0.75 ? 'active' : ''}`}
              onClick={() => setPreset(0.75, 0.25)}
            >
              パッチ直後 (プロ重視 75:25)
            </button>
            <button
              className={`preset-btn ${currentWeights.proWeight === 0.60 ? 'active' : ''}`}
              onClick={() => setPreset(0.60, 0.40)}
            >
              標準バランス (60:40)
            </button>
            <button
              className={`preset-btn ${currentWeights.proWeight === 0.40 ? 'active' : ''}`}
              onClick={() => setPreset(0.40, 0.60)}
            >
              データ重視 (40:60)
            </button>
          </div>
        </div>
      </div>

      {/* 3ステップパイプライン解説 */}
      <div className="logic-steps-grid">
        <div className="logic-step-card">
          <div className="step-number font-display">01</div>
          <div className="step-icon">
            <Eye size={24} />
          </div>
          <h3>プロ・配信者のティア表画像 解析</h3>
          <p>
            YouTubeやX上のTiermaker画像をクローラーが検知。Gemini Vision APIを用いて各行（S〜D）に配置されたヒーローを構造化抽出します。
          </p>
          <div className="step-badge">
            <Sparkles size={12} /> マルチモーダル画像認識
          </div>
        </div>

        <div className="logic-step-card">
          <div className="step-number font-display">02</div>
          <div className="step-icon">
            <BarChart3 size={24} />
          </div>
          <h3>高レート帯 統計データの収集</h3>
          <p>
            Overbuffおよび公式リーダーボードから、グランドマスター・チャンピオン帯の「勝率」「ピック率」「K/D」を定期スクレイピングして蓄積します。
          </p>
          <div className="step-badge">
            <CheckCircle2 size={12} /> Overbuff GM帯クローラー
          </div>
        </div>

        <div className="logic-step-card">
          <div className="step-number font-display">03</div>
          <div className="step-icon">
            <Calculator size={24} />
          </div>
          <h3>ベイズ推定による統合メタスコア算出</h3>
          <p>
            ピック率が極端に低いキャラの勝率のブレをベイズ平滑化定数（C=2.5）で補正し、プロ合意スコアと統計スコアを合成して最終ティア（S〜D）を決定します。
          </p>
          <div className="step-badge">
            <Calculator size={12} /> ベイズ平滑化モデル
          </div>
        </div>
      </div>

      {/* 計算式詳細 */}
      <div className="formula-box">
        <h3>計算式の詳細定義</h3>
        <div className="formula-code font-display">
          MetaScore = (ProScore × {currentWeights.proWeight.toFixed(2)}) + (StatScore × {currentWeights.statWeight.toFixed(2)})
        </div>
        <div className="formula-breakdown">
          <ul>
            <li>
              <strong>ProScore (プロ合意点)</strong>: S=100pt, A=80pt, B=60pt, C=40pt, D=20pt として集計した全配信者の加重平均点。
            </li>
            <li>
              <strong>StatScore (統計実績点)</strong>: ベイズ補正勝率 [(WinRate × PickRate + 50 × 2.5) / (PickRate + 2.5)] をベースに、ロール内ピック率を加味して0〜100点に正規化。
            </li>
            <li>
              <strong>判定しきい値</strong>: S (90+), A (80-89.9), B (65-79.9), C (50-64.9), D (&lt;50)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
