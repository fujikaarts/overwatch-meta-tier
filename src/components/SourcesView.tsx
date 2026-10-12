import React from 'react';
import { MOCK_SOURCES } from '../data/mockSources';
import { ExternalLink, CheckCircle2, Cpu, Video, Sparkles } from 'lucide-react';

export const SourcesView: React.FC = () => {
  return (
    <div className="sources-view-container glass-panel">
      <div className="sources-header">
        <div className="sources-header-left">
          <div className="chip-badge">
            <Cpu size={14} /> AI自動収集 & 解析インデックス
          </div>
          <h2>収集対象のプロ・ストリーマー一覧</h2>
          <p>
            YouTube・X (旧Twitter)・Twitch上で公開された直近パッチのティアリスト動画・画像をAI（マルチモーダルVisionモデル）が自動検知・解析し、各ヒーローのティア位置を抽出しています。
          </p>
        </div>
        <div className="sources-stats-box">
          <div className="stat-num font-display">{MOCK_SOURCES.length}</div>
          <div className="stat-label">登録・解析済みソース</div>
        </div>
      </div>

      <div className="sources-grid">
        {MOCK_SOURCES.map((src) => (
          <div key={src.id} className="source-card">
            <div className="source-card-header">
              <div className="source-creator-info">
                <span className="creator-platform-icon">
                  <Video size={16} />
                </span>
                <div>
                  <h4 className="source-creator-name">{src.creatorName}</h4>
                  <span className="source-creator-sub">{src.creatorRole}</span>
                </div>
              </div>
              <div className={`ai-status-badge ${src.aiStatus === '管理者承認済' ? 'approved' : 'analyzed'}`}>
                {src.aiStatus === '管理者承認済' ? (
                  <>
                    <CheckCircle2 size={12} /> 承認済
                  </>
                ) : (
                  <>
                    <Sparkles size={12} /> AI解析完了
                  </>
                )}
              </div>
            </div>

            <div className="source-card-body">
              <h5 className="source-video-title">{src.title}</h5>
              <div className="source-meta-row">
                <span className="source-date">投稿: {src.publishedAt}</span>
                <span className="source-platform-tag">{src.platform}</span>
                <span className="source-sample-tag">{src.sampleCount} ヒーロー判定</span>
              </div>
              <div className="source-tags-row">
                {src.tags.map((t, idx) => (
                  <span key={idx} className="source-tag-chip">#{t}</span>
                ))}
              </div>
            </div>

            <div className="source-card-footer">
              <a
                href={src.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="source-view-btn"
              >
                元コンテンツを開く <ExternalLink size={13} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
