import React, { useState } from 'react';
import { resolveHeroByName } from '../utils/heroDictionary';
import type { TierGrade, HeroData } from '../types';
import { Sparkles, Upload, CheckCircle2, ArrowRight, Play, RefreshCw, Layers } from 'lucide-react';

interface VisionStudioViewProps {
  onIntegrateResults?: (newTiers: Record<TierGrade, string[]>, sourceName: string) => void;
  allHeroes: HeroData[];
}

// サンプル画像プリセット
const SAMPLE_PRESETS = [
  {
    id: 'sample-tiermaker',
    title: 'サンプル1: おなじみのTierMaker画像 (提供画像)',
    creator: 'コミュニティ Top500 Streamer',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
    parsedResult: {
      S: ['D.Va', 'Zarya', 'Tracer', 'Juno', 'Kiriko', 'Lucio'],
      A: ['Illari', 'Sigma', 'Sojourn', 'Bastion', 'Cassidy', 'Symmetra', 'Wrecking Ball'],
      B: [
        'Winston', 'Doomfist', 'Roadhog', 'Junker Queen', 'Reaper',
        'Ashe', 'Echo', 'Pharah', 'Torbjorn', 'Junkrat', 'Hanzo', 'Sombra', 'Genji',
        'Baptiste', 'Brigitte', 'Ana'
      ],
      C: [
        'Ramattra', 'Mauga', 'Reinhardt', 'Orisa', 'Venture',
        'Soldier: 76', 'Mei', 'Lifeweaver', 'Zenyatta'
      ],
      D: ['Widowmaker', 'Moira', 'Mercy']
    },
    confidence: 0.96,
    notes: 'TierMakerの行と各ヒーロー顔アイコンを完全検出。S帯にD.Va・キリコ・ルシオ等の高機動力キャラを認識しました。'
  },
  {
    id: 'sample-youtube',
    title: 'サンプル2: プロプレイヤーのYouTubeサムネイル画像',
    creator: 'Ta1yo (元OWLプロ)',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=80',
    parsedResult: {
      S: ['D.Va', 'Tracer', 'Juno', 'Ana'],
      A: ['Winston', 'Sigma', 'Ashe', 'Venture', 'Kiriko', 'Baptiste'],
      B: ['Ramattra', 'Genji', 'Cassidy', 'Sombra', 'Lucio', 'Brigitte'],
      C: ['Mauga', 'Reinhardt', 'Soldier: 76', 'Mei', 'Zenyatta', 'Mercy'],
      D: ['Roadhog', 'Symmetra', 'Lifeweaver']
    },
    confidence: 0.94,
    notes: '動画内オーバーレイ画像から抽出。ジュノとトレーサーの評価が全配信者中トップクラスに高い傾向を検知。'
  }
];

export const VisionStudioView: React.FC<VisionStudioViewProps> = ({ onIntegrateResults, allHeroes }) => {
  const [selectedPresetId, setSelectedPresetId] = useState(SAMPLE_PRESETS[0].id);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analyzedOutput, setAnalyzedOutput] = useState<typeof SAMPLE_PRESETS[0] | null>(null);
  const [integratedSuccess, setIntegratedSuccess] = useState(false);

  const activePreset = SAMPLE_PRESETS.find((p) => p.id === selectedPresetId) || SAMPLE_PRESETS[0];

  // ファイルアップロードハンドラー
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImagePreview(event.target?.result as string);
        setSelectedPresetId('custom');
      };
      reader.readAsDataURL(file);
    }
  };

  // AI解析シミュレーション実行
  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisProgress(10);
    setAnalyzedOutput(null);
    setIntegratedSuccess(false);

    // 解析プログレスアニメーション
    const step1 = setTimeout(() => setAnalysisProgress(40), 400);
    const step2 = setTimeout(() => setAnalysisProgress(75), 900);
    const step3 = setTimeout(() => {
      setAnalysisProgress(100);
      setIsAnalyzing(false);
      setAnalyzedOutput(activePreset);
    }, 1400);

    return () => {
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
    };
  };

  // メタティアリストへの統合実行
  const handleIntegrate = () => {
    if (!analyzedOutput) return;
    if (onIntegrateResults) {
      onIntegrateResults(analyzedOutput.parsedResult as Record<TierGrade, string[]>, analyzedOutput.creator);
    }
    setIntegratedSuccess(true);
  };

  // ヒーロー名からHeroDataを検索
  const getHeroData = (name: string): HeroData | undefined => {
    const info = resolveHeroByName(name);
    if (!info) return undefined;
    return allHeroes.find((h) => h.id === info.id);
  };

  return (
    <div className="vision-studio-container glass-panel">
      {/* スタジオヘッダー */}
      <div className="vision-studio-header">
        <div className="studio-title-badge">
          <Sparkles size={14} /> PHASE 2: AI VISION POC (画像解析スタジオ)
        </div>
        <h2>ティアリスト画像 自動解析 & メタ統合スタジオ</h2>
        <p>
          実際の配信者・プロが投稿したTierMakerやYouTubeサムネイル画像をマルチモーダルAIが認識し、
          各行（S〜D）のヒーローを抽出・構造化JSONに変換するパイプラインをテストできます。
        </p>
      </div>

      {/* 2カラムレイアウト: 左に入力・画像選択、右にAIスキャン・解析結果 */}
      <div className="studio-main-grid">
        {/* 左側: 入力パネル */}
        <div className="studio-input-card">
          <h3 className="section-card-title">1. 解析対象のティアリスト画像を指定</h3>

          {/* プリセット選択 */}
          <div className="preset-selector-group">
            <label className="input-group-label">サンプル画像を選択:</label>
            <div className="preset-radio-list">
              {SAMPLE_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  className={`preset-radio-item ${selectedPresetId === preset.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setUploadedImagePreview(null);
                  }}
                >
                  <div className="preset-radio-dot"></div>
                  <div className="preset-radio-info">
                    <strong>{preset.title}</strong>
                    <span>投稿者: {preset.creator}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 画像アップロードまたはURL */}
          <div className="custom-upload-box">
            <label className="input-group-label">または手持ちの画像をアップロード:</label>
            <div className="upload-dropzone">
              <Upload size={20} className="upload-icon" />
              <span>画像をドラッグ＆ドロップ、またはクリックして選択</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input-hidden"
              />
            </div>
          </div>

          {/* 画像プレビュー */}
          <div className="image-preview-box">
            <span className="preview-label">解析プレビュー:</span>
            <div className="preview-frame">
              {uploadedImagePreview ? (
                <img src={uploadedImagePreview} alt="Uploaded Tier List" className="preview-img" />
              ) : (
                <div className="tiermaker-mock-preview">
                  <div className="tm-mini-row row-s">
                    <span className="tm-mini-tag">S</span>
                    <span className="tm-mini-avatars">D.Va, ザリア, トレーサー, ジュノ, キリコ...</span>
                  </div>
                  <div className="tm-mini-row row-a">
                    <span className="tm-mini-tag">A</span>
                    <span className="tm-mini-avatars">ウィンストン, シグマ, ソジョーン, アッシュ...</span>
                  </div>
                  <div className="tm-mini-row row-b">
                    <span className="tm-mini-tag">B</span>
                    <span className="tm-mini-avatars">ドゥーム, JQ, リーパー, ゲンジ, アナ...</span>
                  </div>
                  <div className="tm-mini-row row-c">
                    <span className="tm-mini-tag">C</span>
                    <span className="tm-mini-avatars">ラマットラ, マウガ, ハルト, ソルジャー...</span>
                  </div>
                  <div className="tm-mini-row row-d">
                    <span className="tm-mini-tag">D</span>
                    <span className="tm-mini-avatars">ウィドウ, モイラ, マーシー...</span>
                  </div>
                </div>
              )}

              {/* 解析中のスキャンレーザーアニメーション */}
              {isAnalyzing && (
                <div className="ai-scanning-laser">
                  <div className="laser-beam"></div>
                  <div className="laser-status">AI Vision モデル解析中... ({analysisProgress}%)</div>
                </div>
              )}
            </div>
          </div>

          {/* 解析実行ボタン */}
          <button
            id="run-vision-ai-btn"
            className="run-analysis-btn"
            onClick={handleStartAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <RefreshCw size={16} className="spin-icon" />
                <span>AI解析を実行中 ({analysisProgress}%)...</span>
              </>
            ) : (
              <>
                <Play size={16} />
                <span>AIでティアリスト画像を解析する</span>
              </>
            )}
          </button>
        </div>

        {/* 右側: 解析結果・構造化データ・メタ統合 */}
        <div className="studio-output-card">
          <h3 className="section-card-title">2. AI解析結果 & 構造化データ</h3>

          {analyzedOutput ? (
            <div className="analysis-result-content animate-fade-in">
              {/* 解析メタ情報 */}
              <div className="result-meta-header">
                <div className="meta-badge-group">
                  <span className="badge-confidence">
                    <CheckCircle2 size={13} /> 信頼度スコア: {Math.round(analyzedOutput.confidence * 100)}%
                  </span>
                  <span className="badge-model">Model: Gemini 2.0 Flash / Vision</span>
                </div>
                <div className="analysis-detected-creator">
                  検出元: <strong>{analyzedOutput.creator}</strong>
                </div>
              </div>

              {/* AIが抽出した各行のヒーロー一覧 */}
              <div className="extracted-tiers-view">
                {(['S', 'A', 'B', 'C', 'D'] as TierGrade[]).map((tier) => {
                  const heroNames = (analyzedOutput.parsedResult as any)[tier] as string[] || [];
                  return (
                    <div key={tier} className={`extracted-tier-row tier-border-${tier.toLowerCase()}`}>
                      <div className={`extracted-tier-tag tier-bg-${tier.toLowerCase()} font-display`}>
                        {tier}
                      </div>
                      <div className="extracted-heroes-chips">
                        {heroNames.map((name, i) => {
                          const hero = getHeroData(name);
                          return (
                            <div key={i} className="extracted-hero-chip" title={name}>
                              {hero ? (
                                <>
                                  <img src={hero.avatarUrl} alt={hero.nameJa} className="chip-avatar-img" />
                                  <span className="chip-hero-name">{hero.nameJa}</span>
                                </>
                              ) : (
                                <span className="chip-hero-name">{name}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* AIによる考察ノート */}
              <div className="ai-notes-box">
                <div className="notes-title font-display">AI METAGAME ANALYSIS:</div>
                <p>「{analyzedOutput.notes}」</p>
              </div>

              {/* 統合アクション */}
              <div className="integrate-action-box">
                <div className="integrate-desc">
                  <h4>サイトのメタティアリストへ反映</h4>
                  <p>この解析結果を既存のプロ評価プール（加重平均）に統合し、最新の総合メタスコアを再計算します。</p>
                </div>
                <button
                  id="integrate-meta-btn"
                  className={`integrate-btn ${integratedSuccess ? 'success' : ''}`}
                  onClick={handleIntegrate}
                  disabled={integratedSuccess}
                >
                  {integratedSuccess ? (
                    <>
                      <CheckCircle2 size={16} /> 統合完了！メタスコアを更新しました
                    </>
                  ) : (
                    <>
                      <Layers size={16} /> メタティアリストに統合する <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="empty-analysis-placeholder">
              <Sparkles size={40} className="empty-icon" />
              <h4>AI画像解析の待機中</h4>
              <p>左側の「AIでティアリスト画像を解析する」ボタンをクリックすると、画像内のヒーロー認識・JSON化プロセスが開始されます。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
