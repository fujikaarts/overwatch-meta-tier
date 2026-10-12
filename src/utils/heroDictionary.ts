export interface HeroMetaInfo {
  id: string;
  name: string;
  nameJa: string;
  role: 'tank' | 'damage' | 'support';
  aliases: string[];
}

export const HERO_DICTIONARY: HeroMetaInfo[] = [
  // TANKS
  { id: 'dva', name: 'D.Va', nameJa: 'D.Va', role: 'tank', aliases: ['dva', 'd.va', 'ディーヴァ', 'ハナ・ソング'] },
  { id: 'doomfist', name: 'Doomfist', nameJa: 'ドゥームフィスト', role: 'tank', aliases: ['doomfist', 'doom', 'ドゥーム'] },
  { id: 'junkerqueen', name: 'Junker Queen', nameJa: 'ジャンカー・クイーン', role: 'tank', aliases: ['junker queen', 'jq', 'クイーン'] },
  { id: 'mauga', name: 'Mauga', nameJa: 'マウガ', role: 'tank', aliases: ['mauga', 'マウガ'] },
  { id: 'orisa', name: 'Orisa', nameJa: 'オリーサ', role: 'tank', aliases: ['orisa', 'オリーサ'] },
  { id: 'ramattra', name: 'Ramattra', nameJa: 'ラマットラ', role: 'tank', aliases: ['ramattra', 'ram', 'ラマ'] },
  { id: 'reinhardt', name: 'Reinhardt', nameJa: 'ラインハルト', role: 'tank', aliases: ['reinhardt', 'rein', 'ハルト'] },
  { id: 'roadhog', name: 'Roadhog', nameJa: 'ロードホッグ', role: 'tank', aliases: ['roadhog', 'hog', 'ホッグ'] },
  { id: 'sigma', name: 'Sigma', nameJa: 'シグマ', role: 'tank', aliases: ['sigma', 'シグマ'] },
  { id: 'winston', name: 'Winston', nameJa: 'ウィンストン', role: 'tank', aliases: ['winston', 'monkey', 'ゴリラ'] },
  { id: 'wreckingball', name: 'Wrecking Ball', nameJa: 'レッキング・ボール', role: 'tank', aliases: ['wrecking ball', 'ball', 'hammond', 'ハムスター'] },
  { id: 'zarya', name: 'Zarya', nameJa: 'ザリア', role: 'tank', aliases: ['zarya', 'ザリア'] },

  // DAMAGE
  { id: 'ashe', name: 'Ashe', nameJa: 'アッシュ', role: 'damage', aliases: ['ashe', 'アッシュ', 'bob'] },
  { id: 'bastion', name: 'Bastion', nameJa: 'バスティオン', role: 'damage', aliases: ['bastion', 'バス'] },
  { id: 'cassidy', name: 'Cassidy', nameJa: 'キャスディ', role: 'damage', aliases: ['cassidy', 'mccree', 'マクリー'] },
  { id: 'echo', name: 'Echo', nameJa: 'エコー', role: 'damage', aliases: ['echo', 'エコー'] },
  { id: 'genji', name: 'Genji', nameJa: 'ゲンジ', role: 'damage', aliases: ['genji', 'ゲンジ'] },
  { id: 'hanzo', name: 'Hanzo', nameJa: 'ハンゾー', role: 'damage', aliases: ['hanzo', 'ハンゾー'] },
  { id: 'junkrat', name: 'Junkrat', nameJa: 'ジャンクラット', role: 'damage', aliases: ['junkrat', 'junk', 'ジャンク'] },
  { id: 'mei', name: 'Mei', nameJa: 'メイ', role: 'damage', aliases: ['mei', 'メイ'] },
  { id: 'pharah', name: 'Pharah', nameJa: 'ファラ', role: 'damage', aliases: ['pharah', 'ファラ'] },
  { id: 'reaper', name: 'Reaper', nameJa: 'リーパー', role: 'damage', aliases: ['reaper', 'リーパー'] },
  { id: 'sojourn', name: 'Sojourn', nameJa: 'ソジョーン', role: 'damage', aliases: ['sojourn', 'ソジョ'] },
  { id: 'soldier76', name: 'Soldier: 76', nameJa: 'ソルジャー76', role: 'damage', aliases: ['soldier: 76', 'soldier 76', 's76', 'ソルジャー'] },
  { id: 'sombra', name: 'Sombra', nameJa: 'ソンブラ', role: 'damage', aliases: ['sombra', 'ソンブラ'] },
  { id: 'symmetra', name: 'Symmetra', nameJa: 'シンメトラ', role: 'damage', aliases: ['symmetra', 'sym', 'シンメ'] },
  { id: 'torbjorn', name: 'Torbjorn', nameJa: 'トールビョーン', role: 'damage', aliases: ['torbjorn', 'torb', 'トール'] },
  { id: 'tracer', name: 'Tracer', nameJa: 'トレーサー', role: 'damage', aliases: ['tracer', 'トレ'] },
  { id: 'venture', name: 'Venture', nameJa: 'ベンチャー', role: 'damage', aliases: ['venture', 'ベンチャー'] },
  { id: 'widowmaker', name: 'Widowmaker', nameJa: 'ウィドウメイカー', role: 'damage', aliases: ['widowmaker', 'widow', 'ウィドウ'] },

  // SUPPORT
  { id: 'ana', name: 'Ana', nameJa: 'アナ', role: 'support', aliases: ['ana', 'アナ'] },
  { id: 'baptiste', name: 'Baptiste', nameJa: 'バティスト', role: 'support', aliases: ['baptiste', 'bap', 'バティ'] },
  { id: 'brigitte', name: 'Brigitte', nameJa: 'ブリギッテ', role: 'support', aliases: ['brigitte', 'brig', 'ブリ'] },
  { id: 'illari', name: 'Illari', nameJa: 'イラリー', role: 'support', aliases: ['illari', 'イラリー'] },
  { id: 'juno', name: 'Juno', nameJa: 'ジュノ', role: 'support', aliases: ['juno', 'ジュノ'] },
  { id: 'kiriko', name: 'Kiriko', nameJa: 'キリコ', role: 'support', aliases: ['kiriko', 'キリコ'] },
  { id: 'lifeweaver', name: 'Lifeweaver', nameJa: 'ライフウィーバー', role: 'support', aliases: ['lifeweaver', 'lw', 'ウィーバー'] },
  { id: 'lucio', name: 'Lucio', nameJa: 'ルシオ', role: 'support', aliases: ['lucio', 'ルシオ'] },
  { id: 'mercy', name: 'Mercy', nameJa: 'マーシー', role: 'support', aliases: ['mercy', 'マーシー'] },
  { id: 'moira', name: 'Moira', nameJa: 'モイラ', role: 'support', aliases: ['moira', 'モイラ'] },
  { id: 'zenyatta', name: 'Zenyatta', nameJa: 'ゼニヤッタ', role: 'support', aliases: ['zenyatta', 'zen', 'ゼニ'] }
];

/**
 * AIが抽出した文字列（例: "D.Va", "monkey", "Hana Song"）から正規化されたヒーロー情報を解決する
 */
export function resolveHeroByName(query: string): HeroMetaInfo | undefined {
  const q = query.toLowerCase().trim();
  return HERO_DICTIONARY.find(
    (h) =>
      h.id.toLowerCase() === q ||
      h.name.toLowerCase() === q ||
      h.nameJa.toLowerCase() === q ||
      h.aliases.some((a) => a.toLowerCase() === q)
  );
}
