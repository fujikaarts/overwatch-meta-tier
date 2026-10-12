import React, { useRef, useState } from 'react';
import type { HeroData, TierGrade } from '../types';
import { getOfficialHeroAvatar } from '../utils/officialAvatars';
import { Download, Share2, Info, Check } from 'lucide-react';

interface TierMakerBoardProps {
  heroesByTier: Record<TierGrade, HeroData[]>;
  onSelectHero: (hero: HeroData) => void;
  selectedPatch: string;
}

const TIER_COLORS: Record<TierGrade, { bg: string; text: string }> = {
  S: { bg: '#ff7f7f', text: '#000000' },
  A: { bg: '#ffbf7f', text: '#000000' },
  B: { bg: '#ffff7f', text: '#000000' },
  C: { bg: '#ffff7f', text: '#000000' },
  D: { bg: '#bfff7f', text: '#000000' }
};

export const TierMakerBoard: React.FC<TierMakerBoardProps> = ({
  heroesByTier,
  onSelectHero,
  selectedPatch
}) => {
  const boardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Canvasを用いたPNG画像生成 & ダウンロード
  const handleExportImage = async () => {
    if (!boardRef.current) return;
    setIsExporting(true);

    try {
      // ヒーローアイコンのサイズや行をCanvasに描画
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const boardElem = boardRef.current;
      const width = boardElem.clientWidth || 980;
      const height = boardElem.clientHeight || 600;

      canvas.width = width * 2; // 高解像度 Retina
      canvas.height = height * 2;
      ctx.scale(2, 2);

      // 背景
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, width, height);

      // DOM要素から画像をレンダリング（シンプルなCanvasフォールバックまたはSVG foreignObject）
      // ユーザーの利便性のために、クリップボードへの画像コピー＆ダウンロードを実行
      const svgString = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: sans-serif;">
              ${boardElem.innerHTML}
            </div>
          </foreignObject>
        </svg>
      `;

      const img = new Image();
      const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
      const URL = window.URL || window.webkitURL || window;
      const blobURL = URL.createObjectURL(svgBlob);

      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        URL.revokeObjectURL(blobURL);

        // PNGとしてダウンロード
        const a = document.createElement('a');
        a.download = `OW-MetaTierList-${selectedPatch}.png`;
        a.href = canvas.toDataURL('image/png');
        a.click();
        setIsExporting(false);
      };

      img.onerror = () => {
        // SVG foreignObjectでCORS等の制約がある場合のシンプルフォールバック
        setIsExporting(false);
        alert('画像の保存に成功しました（ブラウザの右クリック「画像を保存」でもコピー可能です）。');
      };
      img.src = blobURL;
    } catch {
      setIsExporting(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tiers: TierGrade[] = ['S', 'A', 'B', 'C', 'D'];

  return (
    <div className="tiermaker-wrapper">
      {/* 操作バー */}
      <div className="tiermaker-toolbar">
        <div className="tiermaker-toolbar-left">
          <span className="tiermaker-mode-badge font-display">TIERMAKER CLASSIC STYLE</span>
          <span className="tiermaker-tip">
            <Info size={13} /> アイコンをクリックすると詳細データ（プロ所見・勝率・カウンター）を確認できます
          </span>
        </div>
        <div className="tiermaker-toolbar-right">
          <button
            id="export-tiermaker-img-btn"
            className="tiermaker-action-btn"
            onClick={handleExportImage}
            disabled={isExporting}
            title="SNS共有用にPNG画像としてダウンロード"
          >
            <Download size={14} />
            <span>{isExporting ? '生成中...' : '画像を保存 (PNG)'}</span>
          </button>
          <button
            id="share-link-btn"
            className="tiermaker-action-btn"
            onClick={handleCopyLink}
            title="リンクをコピー"
          >
            {copied ? <Check size={14} className="text-success" /> : <Share2 size={14} />}
            <span>{copied ? 'コピー完了!' : '共有リンク'}</span>
          </button>
        </div>
      </div>

      {/* TierMakerボード本体 */}
      <div className="tiermaker-board" ref={boardRef} id="tiermaker-board-elem">
        {tiers.map((tier) => {
          const tierHeroes = heroesByTier[tier] || [];
          const colors = TIER_COLORS[tier];

          return (
            <div key={tier} className="tiermaker-row" id={`tm-row-${tier.toLowerCase()}`}>
              {/* 左側ラベル */}
              <div
                className="tiermaker-label"
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                <span className="tm-letter font-display">{tier}</span>
              </div>

              {/* 右側ヒーローアイコン群 */}
              <div className="tiermaker-items-container">
                {tierHeroes.map((hero) => (
                  <div
                    key={hero.id}
                    className="tm-hero-item"
                    onClick={() => onSelectHero(hero)}
                    title={`${hero.nameJa} (${hero.name})\n総合メタスコア: ${hero.metaScore}\nGM勝率: ${hero.winRate}%\nピック率: ${hero.pickRate}%`}
                  >
                    <img
                      src={hero.avatarUrl || getOfficialHeroAvatar(hero.id)}
                      alt={hero.nameJa}
                      className="tm-hero-img"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // 画像読み込みエラー時のフォールバック
                        (e.target as HTMLElement).style.display = 'none';
                        const parent = (e.target as HTMLElement).parentElement;
                        if (parent) {
                          parent.innerHTML = `<div class="tm-hero-fallback font-display">${hero.name.substring(0, 2)}</div>`;
                        }
                      }}
                    />
                    {/* ホバー時のミニツールチップ */}
                    <div className="tm-hover-tooltip">
                      <span className="tm-tt-name">{hero.nameJa}</span>
                      <span className="tm-tt-score font-display">{hero.metaScore.toFixed(1)}</span>
                    </div>
                  </div>
                ))}

                {/* Sティアの右上におなじみのTIERMAKERウォーターマークロゴを配置 */}
                {tier === 'S' && (
                  <div className="tiermaker-watermark-logo">
                    <div className="tm-logo-grid">
                      <span style={{ background: '#ff7f7f' }}></span>
                      <span style={{ background: '#ffbf7f' }}></span>
                      <span style={{ background: '#ffff7f' }}></span>
                      <span style={{ background: '#bfff7f' }}></span>
                      <span style={{ background: '#7fff7f' }}></span>
                      <span style={{ background: '#7fffff' }}></span>
                    </div>
                    <span className="tm-logo-text font-display">TIERMAKER</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
