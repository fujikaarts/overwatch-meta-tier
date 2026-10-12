import fs from 'fs';

let code = fs.readFileSync('src/data/mockHeroes.ts', 'utf8');

// importの追加
if (!code.includes('OFFICIAL_HERO_PORTRAITS')) {
  code = code.replace(
    "import type { HeroData } from '../types';",
    "import type { HeroData } from '../types';\nimport { OFFICIAL_HERO_PORTRAITS } from '../utils/officialAvatars';"
  );
}

// 各heroのavatarUrlをOFFICIAL_HERO_PORTRAITS[id]に置換
const regex = /id:\s*'([^']+)',([\s\S]*?)avatarUrl:\s*'[^']+'/g;
code = code.replace(regex, (match, id, middle) => {
  return `id: '${id}',${middle}avatarUrl: OFFICIAL_HERO_PORTRAITS['${id}'] || ''`;
});

fs.writeFileSync('src/data/mockHeroes.ts', code, 'utf8');
console.log('Successfully updated all hero avatarUrls to official Blizzard CDN in mockHeroes.ts');
