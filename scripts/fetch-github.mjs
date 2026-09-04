import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const USER = 'eduardochamp1';
const OUT = resolve('src/data/github.json');
const TOKEN = process.env.GITHUB_TOKEN;

const headers = {
  accept: 'application/vnd.github+json',
  'user-agent': `${USER}-portfolio-build`,
  ...(TOKEN ? { authorization: `Bearer ${TOKEN}` } : {}),
};

async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, { headers });
  if (!res.ok) throw new Error(`GitHub ${path} → ${res.status} ${res.statusText}`);
  return res.json();
}

async function main() {
  const raw = await gh(`/users/${USER}/repos?per_page=100&sort=updated`);
  const repos = raw
    .filter((r) => !r.fork && !r.archived && !r.private)
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

  const featured = repos.slice(0, 6).map((r) => ({
    name: r.name,
    description: r.description,
    url: r.html_url,
    language: r.language,
    stars: r.stargazers_count,
    pushed_at: r.pushed_at,
  }));

  const langTotals = {};
  for (const r of repos) {
    try {
      const langs = await gh(`/repos/${USER}/${r.name}/languages`);
      for (const [lang, bytes] of Object.entries(langs)) {
        langTotals[lang] = (langTotals[lang] || 0) + bytes;
      }
    } catch (err) {
      console.warn(`  skip languages for ${r.name}: ${err.message}`);
    }
  }

  const total = Object.values(langTotals).reduce((a, b) => a + b, 0) || 1;
  const langsSorted = Object.entries(langTotals)
    .map(([name, bytes]) => ({ name, bytes, pct: +((bytes / total) * 100).toFixed(1) }))
    .sort((a, b) => b.bytes - a.bytes);
  const top = langsSorted.slice(0, 6);
  const otherPct = +langsSorted.slice(6).reduce((s, l) => s + l.pct, 0).toFixed(1);
  const languages = otherPct > 0 ? [...top, { name: 'Other', bytes: 0, pct: otherPct }] : top;

  let profileReadmeHtml = null;
  try {
    const readme = await fetch(`https://api.github.com/repos/${USER}/${USER}/readme`, {
      headers: { ...headers, accept: 'application/vnd.github.html' },
    });
    if (readme.ok) profileReadmeHtml = await readme.text();
  } catch { /* silently skip */ }

  const out = {
    fetched_at: new Date().toISOString(),
    featured,
    languages,
    profile_readme: profileReadmeHtml,
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(out, null, 2));
  console.log(`wrote ${OUT} — ${featured.length} repos, ${languages.length} languages`);
}

main().catch((err) => {
  console.error(err);
  if (existsSync(OUT)) {
    console.warn('using previous github.json (fetch failed)');
    process.exit(0);
  }
  process.exit(1);
});
