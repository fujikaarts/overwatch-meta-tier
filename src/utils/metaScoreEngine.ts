import type { HeroData, TierGrade } from '../types';

export interface ScoringWeights {
  proWeight: number; // 0.0 - 1.0 (例: 0.60)
  statWeight: number; // 0.0 - 1.0 (例: 0.40)
  bayesianConstant: number; // ベイズ平滑化定数 (例: 2.0)
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  proWeight: 0.60,
  statWeight: 0.40,
  bayesianConstant: 2.5
};

export interface CalculatedHeroScore {
  proScore: number; // 0-100
  statScore: number; // 0-100
  finalMetaScore: number; // 0-100
  calculatedTier: TierGrade;
}

/**
 * ヒーローのプロ評価と統計値からメタスコアおよびティアを精密計算する
 */
export function calculateHeroMetaScore(
  hero: HeroData,
  weights: ScoringWeights = DEFAULT_WEIGHTS
): CalculatedHeroScore {
  // 1. プロ・配信者合意スコアの算出 (S=100, A=80, B=60, C=40, D=20)
  const dist = hero.influencerStats.distribution;
  const total = hero.influencerStats.totalReviewers || 1;
  const rawProSum =
    (dist.S || 0) * 100 +
    (dist.A || 0) * 80 +
    (dist.B || 0) * 60 +
    (dist.C || 0) * 40 +
    (dist.D || 0) * 20;
  const proScore = Math.min(100, Math.max(20, rawProSum / total));

  // 2. 統計データスコアの算出 (ベイズ平滑化 + ロール内スケーリング)
  // 低ピック率による勝率の極端なブレを抑える
  const priorMeanWinRate = 50.0;
  const c = weights.bayesianConstant;
  const adjustedWinRate =
    (hero.winRate * hero.pickRate + priorMeanWinRate * c) / (hero.pickRate + c);

  // 勝率45%〜55%を 0点〜100点に正規化（50%が50点、55%が100点、45%が0点）
  const winRateScaled = Math.min(100, Math.max(0, (adjustedWinRate - 45.0) * 10.0));
  // ピック率も加味 (15%を100点として正規化)
  const pickRateScaled = Math.min(100, Math.max(0, (hero.pickRate / 14.0) * 100.0));
  // 統計スコア = 勝率 70% + ピック率 30%
  const statScore = Math.min(100, Math.max(0, winRateScaled * 0.7 + pickRateScaled * 0.3));

  // 3. 重み付けブレンド
  const rawFinalScore = proScore * weights.proWeight + statScore * weights.statWeight;
  const finalMetaScore = Math.round(rawFinalScore * 10) / 10;

  // 4. ティア判定
  let calculatedTier: TierGrade = 'C';
  if (finalMetaScore >= 90.0) calculatedTier = 'S';
  else if (finalMetaScore >= 80.0) calculatedTier = 'A';
  else if (finalMetaScore >= 65.0) calculatedTier = 'B';
  else if (finalMetaScore >= 50.0) calculatedTier = 'C';
  else calculatedTier = 'D';

  return {
    proScore: Math.round(proScore * 10) / 10,
    statScore: Math.round(statScore * 10) / 10,
    finalMetaScore,
    calculatedTier
  };
}

/**
 * 重み付け設定を全ヒーローに適用し、スコアとティアを再計算したリストを返す
 */
export function recalculateAllHeroes(
  heroes: HeroData[],
  weights: ScoringWeights
): HeroData[] {
  return heroes.map((hero) => {
    const calc = calculateHeroMetaScore(hero, weights);
    return {
      ...hero,
      metaScore: calc.finalMetaScore,
      tier: calc.calculatedTier
    };
  });
}
