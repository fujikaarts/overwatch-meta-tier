import fs from 'fs';

let code = fs.readFileSync('src/data/mockHeroes.ts', 'utf8');

// opinions内のop-1, op-2, op-t1, op-j1などのcreator avatarUrlを直す
code = code.replace(/id:\s*'(op-[^']+)',[\s\S]*?avatarUrl:\s*OFFICIAL_HERO_PORTRAITS\['[^']+'\] \|\| ''/g, (match, id) => {
  return match.replace(/avatarUrl:\s*OFFICIAL_HERO_PORTRAITS\['[^']+'\] \|\| ''/, `avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces'`);
});

fs.writeFileSync('src/data/mockHeroes.ts', code, 'utf8');
console.log('Fixed creator avatar URLs!');
