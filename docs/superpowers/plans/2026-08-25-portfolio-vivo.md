# Portfólio vivo — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o `index.html` estático por um site Astro que se auto-atualiza diariamente com dados do GitHub, bilíngue (EN/PT), estilo minimalista editorial, single-scroll.

**Architecture:** Astro (SSG) → GitHub Actions roda diariamente + em cada push → um script Node busca dados do GitHub (repos + languages) → Astro consome o JSON no build → deploy no GitHub Pages via `actions/deploy-pages`. i18n via config nativa (`/` = EN, `/pt/` = PT).

**Tech Stack:** Astro 4.x, Node 20, GitHub Actions, GitHub REST API v3. Sem framework CSS, sem JS runtime (Astro entrega HTML puro).

**Spec:** [docs/superpowers/specs/2026-08-25-portfolio-vivo-design.md](../specs/2026-08-25-portfolio-vivo-design.md)

**Working branch:** `redesign-astro` (não tocar em `master` até o merge final, pra manter o site atual no ar).

---

## Task 1: Branch de trabalho + scaffold Astro

**Files:**
- Create: `package.json`, `astro.config.mjs`, `.gitignore` (update), `tsconfig.json`
- Delete (só nesse branch): todos os `js/*`, `css/*`, `fonts/*`, `images/service/*`, `images/portfolio/*`, `images/main_bg.png`, `images/sp_main_bg.png`, `images/photo.png`, `images/jose-icon.png`, `index.html`
- Preserve: `cv/Jose Zouain CV.pdf`, `icon.ico`, `.gitignore`, `docs/`

- [ ] **Step 1: Criar e checkoutar o branch**

```bash
git checkout -b redesign-astro
```

- [ ] **Step 2: Mover assets a preservar pra fora e limpar a árvore**

```bash
mkdir -p _tmp_preserve
cp -r cv icon.ico _tmp_preserve/
git rm -rf js css fonts images index.html
mkdir -p public
mv _tmp_preserve/cv public/cv
mv _tmp_preserve/icon.ico public/icon.ico
rmdir _tmp_preserve
```

Expected: `git status` mostra deleções + `public/` novo com o CV e o icon.

- [ ] **Step 3: Inicializar `package.json`**

Create `package.json`:

```json
{
  "name": "eduardochamp1-portfolio",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "node scripts/fetch-github.mjs && astro build",
    "build:no-fetch": "astro build",
    "preview": "astro preview",
    "check:i18n": "node scripts/check-i18n.mjs"
  },
  "dependencies": {
    "astro": "^4.15.0"
  }
}
```

- [ ] **Step 4: Criar `astro.config.mjs`**

Create `astro.config.mjs`:

```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://eduardochamp1.github.io',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false },
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
```

- [ ] **Step 5: Criar `tsconfig.json`**

Create `tsconfig.json`:

```json
{ "extends": "astro/tsconfigs/strict" }
```

- [ ] **Step 6: Atualizar `.gitignore`**

Edit `.gitignore` — adicionar (mantendo `.superpowers/`):

```
node_modules/
dist/
.astro/
src/data/github.json
```

- [ ] **Step 7: Instalar deps**

```bash
npm install
```

Expected: `node_modules/` criado, `package-lock.json` gerado.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold astro project on redesign-astro branch"
```

---

## Task 2: Base layout + global CSS + i18n dictionaries

**Files:**
- Create: `src/layouts/Base.astro`, `src/styles/global.css`, `src/i18n/en.json`, `src/i18n/pt.json`, `src/i18n/index.ts`

- [ ] **Step 1: Criar `src/styles/global.css`**

Create `src/styles/global.css`:

```css
:root {
  --bg: #ffffff;
  --fg: #111111;
  --muted: #666666;
  --line: #e5e5e5;
  --surface: #fafafa;
  --accent: #8bc34a;
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --max: 720px;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #0f0f0f;
    --fg: #f2f2f2;
    --muted: #888;
    --line: #222;
    --surface: #171717;
  }
}

* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--fg);
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
}

a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
a:hover { text-decoration-thickness: 2px; }

.wrap { max-width: var(--max); margin: 0 auto; padding: 0 24px; }

.section { padding: 64px 0; }
.section + .section { border-top: 1px solid var(--line); }

.label {
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  margin: 0 0 12px;
}

h1, h2, h3 { margin: 0; font-weight: 700; letter-spacing: -0.015em; }
h1 { font-size: clamp(36px, 6vw, 56px); line-height: 1.05; }
h2 { font-size: clamp(22px, 3vw, 28px); }
h3 { font-size: 16px; }

p { margin: 0 0 12px; }
p:last-child { margin-bottom: 0; }

.accent { color: var(--accent); }
```

- [ ] **Step 2: Criar `src/i18n/en.json`**

Create `src/i18n/en.json`:

```json
{
  "hero": {
    "title_a": "Electrical Engineer",
    "title_b": "Developer",
    "location": "Guarapari, BR",
    "cta_cv": "Download CV",
    "cta_github": "GitHub",
    "cta_linkedin": "LinkedIn"
  },
  "sections": {
    "now": "Now",
    "work": "Selected work",
    "background": "Background",
    "languages": "Languages",
    "contact": "Contact"
  },
  "nav": { "toggle_lang": "PT" },
  "work": {
    "empty": "GitHub data unavailable.",
    "updated_at": "Auto-updated from GitHub on"
  },
  "now": { "updated_at": "Last updated" },
  "background": {
    "education": "Education",
    "experience": "Experience",
    "cta_full_cv": "Download full CV"
  },
  "footer": { "copy": "Copyright © José Zouain" }
}
```

- [ ] **Step 3: Criar `src/i18n/pt.json`**

Create `src/i18n/pt.json`:

```json
{
  "hero": {
    "title_a": "Engenheiro Eletricista",
    "title_b": "Desenvolvedor",
    "location": "Guarapari, BR",
    "cta_cv": "Baixar CV",
    "cta_github": "GitHub",
    "cta_linkedin": "LinkedIn"
  },
  "sections": {
    "now": "Agora",
    "work": "Projetos em destaque",
    "background": "Trajetória",
    "languages": "Linguagens",
    "contact": "Contato"
  },
  "nav": { "toggle_lang": "EN" },
  "work": {
    "empty": "Dados do GitHub indisponíveis.",
    "updated_at": "Atualizado automaticamente do GitHub em"
  },
  "now": { "updated_at": "Última atualização" },
  "background": {
    "education": "Formação",
    "experience": "Experiência",
    "cta_full_cv": "Baixar CV completo"
  },
  "footer": { "copy": "Copyright © José Zouain" }
}
```

- [ ] **Step 4: Criar loader `src/i18n/index.ts`**

Create `src/i18n/index.ts`:

```ts
import en from './en.json';
import pt from './pt.json';

export type Locale = 'en' | 'pt';
export const dicts = { en, pt } as const;
export type Dict = typeof en;

export function t(locale: Locale): Dict {
  return dicts[locale];
}

export function pathFor(locale: Locale, path = ''): string {
  const clean = path.replace(/^\//, '');
  return locale === 'en' ? `/${clean}` : `/pt/${clean}`;
}
```

- [ ] **Step 5: Criar `src/layouts/Base.astro`**

Create `src/layouts/Base.astro`:

```astro
---
import '../styles/global.css';
import { t, type Locale, pathFor } from '../i18n';

interface Props { locale: Locale; title: string; description: string; }
const { locale, title, description } = Astro.props;
const dict = t(locale);
const other: Locale = locale === 'en' ? 'pt' : 'en';
---
<!doctype html>
<html lang={locale === 'en' ? 'en' : 'pt-BR'}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/icon.ico" sizes="any" />
    <meta name="theme-color" content="#8bc34a" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:card" content="summary" />
  </head>
  <body>
    <header class="wrap" style="padding-top:24px;display:flex;justify-content:space-between;align-items:center">
      <a href={pathFor(locale)} style="text-decoration:none;font-weight:600">josé zouain</a>
      <nav style="display:flex;gap:20px;font-size:14px">
        <a href="#now">{dict.sections.now}</a>
        <a href="#work">{dict.sections.work}</a>
        <a href="#background">{dict.sections.background}</a>
        <a href="#contact">{dict.sections.contact}</a>
        <a href={pathFor(other)} aria-label={`Switch to ${other.toUpperCase()}`}>{dict.nav.toggle_lang}</a>
      </nav>
    </header>
    <main class="wrap">
      <slot />
    </main>
    <footer class="wrap" style="padding:48px 24px;color:var(--muted);font-size:13px;text-align:center">
      {dict.footer.copy}
    </footer>
  </body>
</html>
```

- [ ] **Step 6: Criar `src/scripts/check-i18n.mjs`** (validador de paridade de chaves)

Create `scripts/check-i18n.mjs`:

```js
import en from '../src/i18n/en.json' with { type: 'json' };
import pt from '../src/i18n/pt.json' with { type: 'json' };

function flatten(obj, prefix = '') {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [`${prefix}${k}`]
  );
}

const enKeys = new Set(flatten(en));
const ptKeys = new Set(flatten(pt));
const missing = [...enKeys].filter((k) => !ptKeys.has(k));
const extra = [...ptKeys].filter((k) => !enKeys.has(k));

if (missing.length || extra.length) {
  console.error('i18n key mismatch');
  if (missing.length) console.error('  missing in pt.json:', missing);
  if (extra.length) console.error('  extra in pt.json:', extra);
  process.exit(1);
}
console.log(`i18n OK (${enKeys.size} keys)`);
```

- [ ] **Step 7: Rodar checagem i18n**

```bash
npm run check:i18n
```

Expected: `i18n OK (N keys)`.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: base layout, global css, i18n dictionaries + validator"
```

---

## Task 3: Home page (EN + PT) com hero placeholder + build passa

**Files:**
- Create: `src/pages/index.astro`, `src/pages/pt/index.astro`, `src/components/Hero.astro`

- [ ] **Step 1: Criar `src/components/Hero.astro`**

Create `src/components/Hero.astro`:

```astro
---
import { t, type Locale } from '../i18n';
interface Props { locale: Locale }
const { locale } = Astro.props;
const dict = t(locale);
---
<section class="section" id="top" style="padding-top:80px">
  <h1>
    {dict.hero.title_a}<br />
    <span class="accent">×</span> {dict.hero.title_b}
  </h1>
  <p style="margin-top:16px;color:var(--muted);font-size:15px">
    {dict.hero.location} · <a href="mailto:zezouain@gmail.com">zezouain@gmail.com</a>
  </p>
  <p style="margin-top:20px;display:flex;gap:20px;flex-wrap:wrap;font-size:14px">
    <a href="/cv/Jose Zouain CV.pdf" target="_blank" rel="noopener">{dict.hero.cta_cv} ↓</a>
    <a href="https://github.com/eduardochamp1" target="_blank" rel="noopener">{dict.hero.cta_github} ↗</a>
    <a href="https://www.linkedin.com/in/joseeduardozouain/" target="_blank" rel="noopener">{dict.hero.cta_linkedin} ↗</a>
  </p>
</section>
```

- [ ] **Step 2: Criar `src/pages/index.astro`**

Create `src/pages/index.astro`:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
---
<Base
  locale="en"
  title="José Zouain — Electrical Engineer × Developer"
  description="Portfolio and CV of José Eduardo Vilela Zouain — Electrical Engineer and Developer."
>
  <Hero locale="en" />
</Base>
```

- [ ] **Step 3: Criar `src/pages/pt/index.astro`**

Create `src/pages/pt/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import Hero from '../../components/Hero.astro';
---
<Base
  locale="pt"
  title="José Zouain — Engenheiro Eletricista × Desenvolvedor"
  description="Portfólio e currículo de José Eduardo Vilela Zouain — Engenheiro Eletricista e Desenvolvedor."
>
  <Hero locale="pt" />
</Base>
```

- [ ] **Step 4: Rodar dev server e conferir manualmente**

```bash
npm run dev
```

Abrir http://localhost:4321/ e http://localhost:4321/pt/. Confirmar: hero renderiza, toggle EN/PT funciona, CV baixa. Parar com Ctrl+C.

- [ ] **Step 5: Build produção passa**

```bash
npm run build:no-fetch
```

Expected: `dist/` gerado, `dist/index.html` e `dist/pt/index.html` existem.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: hero + home page (EN/PT) rendering end-to-end"
```

---

## Task 4: `fetch-github.mjs` — buscar repos e agregar linguagens

**Files:**
- Create: `scripts/fetch-github.mjs`, `src/data/.gitkeep`

- [ ] **Step 1: Criar `src/data/.gitkeep`**

```bash
mkdir -p src/data
touch src/data/.gitkeep
```

- [ ] **Step 2: Criar `scripts/fetch-github.mjs`**

Create `scripts/fetch-github.mjs`:

```js
import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs';
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

  const out = {
    fetched_at: new Date().toISOString(),
    featured,
    languages,
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
```

- [ ] **Step 3: Testar o script localmente**

```bash
node scripts/fetch-github.mjs
```

Expected: `wrote .../src/data/github.json — 6 repos, N languages`. Se hit 403 rate limit, exportar um token: `export GITHUB_TOKEN=ghp_...` (só se necessário; unauth costuma passar pra 1 execução).

- [ ] **Step 4: Verificar o JSON gerado**

```bash
cat src/data/github.json | head -40
```

Expected: JSON válido com `featured[]` (nomes de repos reais) e `languages[]` com percentuais.

- [ ] **Step 5: Commit**

```bash
git add scripts/fetch-github.mjs src/data/.gitkeep
git commit -m "feat: fetch-github script — repos + language aggregation"
```

---

## Task 5: Componente `SelectedWork` consumindo `github.json`

**Files:**
- Create: `src/components/SelectedWork.astro`
- Modify: `src/pages/index.astro`, `src/pages/pt/index.astro`

- [ ] **Step 1: Criar `src/components/SelectedWork.astro`**

Create `src/components/SelectedWork.astro`:

```astro
---
import { t, type Locale } from '../i18n';
interface Props { locale: Locale }
const { locale } = Astro.props;
const dict = t(locale);

let data: { featured: Array<{ name: string; description: string | null; url: string; language: string | null; stars: number }>; fetched_at: string } | null = null;
try {
  data = (await import('../data/github.json')).default as any;
} catch { data = null; }

function formatDate(iso: string, loc: Locale) {
  return new Date(iso).toLocaleDateString(loc === 'en' ? 'en-US' : 'pt-BR', { year: 'numeric', month: 'short', day: 'numeric' });
}
---
<section class="section" id="work">
  <p class="label">{dict.sections.work}</p>
  {data && data.featured.length > 0 ? (
    <>
      <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px">
        {data.featured.map((r) => (
          <li style="border:1px solid var(--line);padding:16px;border-radius:2px">
            <a href={r.url} target="_blank" rel="noopener" style="font-weight:600;text-decoration:none">{r.name} ↗</a>
            {r.description && <p style="color:var(--muted);font-size:14px;margin-top:6px">{r.description}</p>}
            <p style="margin-top:10px;font-size:12px;color:var(--muted)">
              {r.language ?? '—'} · ★ {r.stars}
            </p>
          </li>
        ))}
      </ul>
      <p style="margin-top:16px;font-size:12px;color:var(--muted)">
        {dict.work.updated_at} {formatDate(data.fetched_at, locale)}
      </p>
    </>
  ) : (
    <p style="color:var(--muted)">{dict.work.empty}</p>
  )}
</section>
```

- [ ] **Step 2: Incluir em ambas as páginas**

Edit `src/pages/index.astro` — adicionar import e uso:

```astro
---
import Base from '../layouts/Base.astro';
import Hero from '../components/Hero.astro';
import SelectedWork from '../components/SelectedWork.astro';
---
<Base
  locale="en"
  title="José Zouain — Electrical Engineer × Developer"
  description="Portfolio and CV of José Eduardo Vilela Zouain — Electrical Engineer and Developer."
>
  <Hero locale="en" />
  <SelectedWork locale="en" />
</Base>
```

Edit `src/pages/pt/index.astro`:

```astro
---
import Base from '../../layouts/Base.astro';
import Hero from '../../components/Hero.astro';
import SelectedWork from '../../components/SelectedWork.astro';
---
<Base
  locale="pt"
  title="José Zouain — Engenheiro Eletricista × Desenvolvedor"
  description="Portfólio e currículo de José Eduardo Vilela Zouain — Engenheiro Eletricista e Desenvolvedor."
>
  <Hero locale="pt" />
  <SelectedWork locale="pt" />
</Base>
```

- [ ] **Step 3: Build + verificar**

```bash
npm run build:no-fetch
```

Expected: build OK, `dist/index.html` contém nomes de repos reais.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: SelectedWork component wired to github.json"
```

---

## Task 6: Componente `Languages`

**Files:**
- Create: `src/components/Languages.astro`
- Modify: `src/pages/index.astro`, `src/pages/pt/index.astro`

- [ ] **Step 1: Criar `src/components/Languages.astro`**

Create `src/components/Languages.astro`:

```astro
---
import { t, type Locale } from '../i18n';
interface Props { locale: Locale }
const { locale } = Astro.props;
const dict = t(locale);

const COLORS: Record<string, string> = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C++': '#f34b7d',
  C: '#555555',
  Java: '#b07219',
  Shell: '#89e051',
  Other: '#999999',
};

let data: { languages: Array<{ name: string; pct: number }> } | null = null;
try { data = (await import('../data/github.json')).default as any; } catch { data = null; }
const langs = data?.languages ?? [];
---
{langs.length > 0 && (
  <section class="section" id="languages">
    <p class="label">{dict.sections.languages}</p>
    <div style="display:flex;height:10px;border-radius:5px;overflow:hidden;background:var(--surface)">
      {langs.map((l) => (
        <div style={`width:${l.pct}%;background:${COLORS[l.name] ?? '#999'}`} title={`${l.name} ${l.pct}%`}></div>
      ))}
    </div>
    <ul style="list-style:none;padding:0;margin:16px 0 0;display:flex;flex-wrap:wrap;gap:12px 20px;font-size:13px">
      {langs.map((l) => (
        <li style="display:flex;align-items:center;gap:6px">
          <span style={`width:10px;height:10px;border-radius:50%;background:${COLORS[l.name] ?? '#999'};display:inline-block`}></span>
          {l.name} <span style="color:var(--muted)">{l.pct}%</span>
        </li>
      ))}
    </ul>
  </section>
)}
```

- [ ] **Step 2: Incluir nas duas páginas**

Edit `src/pages/index.astro` — adicionar `import Languages from '../components/Languages.astro';` e `<Languages locale="en" />` após `<SelectedWork ... />`.

Edit `src/pages/pt/index.astro` — mesma coisa com `locale="pt"` e caminho `../../components/Languages.astro`.

- [ ] **Step 3: Build + verificar**

```bash
npm run build:no-fetch
```

Grep pra confirmar renderização: `grep -c "background:#" dist/index.html` deve retornar ≥ 6.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Languages component with GitHub Linguist colors"
```

---

## Task 7: Componente `Now` (lê markdown editado à mão)

**Files:**
- Create: `src/data/now.en.md`, `src/data/now.pt.md`, `src/components/Now.astro`
- Modify: `src/pages/index.astro`, `src/pages/pt/index.astro`

- [ ] **Step 1: Criar arquivos de conteúdo**

Create `src/data/now.en.md`:

```markdown
Studying deeper embedded systems and getting my hands dirty with Rust on the microcontroller side. Also picking up more real-world React patterns.
```

Create `src/data/now.pt.md`:

```markdown
Aprofundando estudos em sistemas embarcados e mexendo com Rust no lado do microcontrolador. Também pegando mais padrões reais de React.
```

- [ ] **Step 2: Criar `src/components/Now.astro`**

Create `src/components/Now.astro`:

```astro
---
import { t, type Locale } from '../i18n';
import enNow from '../data/now.en.md?raw';
import ptNow from '../data/now.pt.md?raw';
interface Props { locale: Locale }
const { locale } = Astro.props;
const dict = t(locale);
const body = (locale === 'en' ? enNow : ptNow).trim();
---
<section class="section" id="now">
  <p class="label">{dict.sections.now}</p>
  <p style="font-size:17px;line-height:1.55;max-width:60ch">{body}</p>
</section>
```

- [ ] **Step 3: Inserir no topo (após Hero, antes de SelectedWork)**

Edit `src/pages/index.astro` — adicionar import de `Now` e uso `<Now locale="en" />` entre `<Hero />` e `<SelectedWork />`.

Edit `src/pages/pt/index.astro` — mesma coisa com `locale="pt"`.

- [ ] **Step 4: Build + verificar**

```bash
npm run build:no-fetch
grep -q "Studying deeper" dist/index.html && grep -q "Aprofundando" dist/pt/index.html && echo OK
```

Expected: `OK`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Now section reading from now.{en,pt}.md"
```

---

## Task 8: Componente `Background` (formação + experiência curadas)

**Files:**
- Create: `src/data/background.json`, `src/components/Background.astro`
- Modify: `src/pages/index.astro`, `src/pages/pt/index.astro`

- [ ] **Step 1: Criar `src/data/background.json`**

Create `src/data/background.json` — migração 1:1 do CV atual:

```json
{
  "education": [
    {
      "title": { "en": "Technical Diploma in Electrotechnics", "pt": "Técnico em Eletrotécnica" },
      "period": "2014–2017",
      "org": "Instituto Federal do Espírito Santo",
      "description": { "en": "Technical high school in Electrotechnics.", "pt": "Curso técnico em eletrotécnica integrado ao ensino médio." }
    },
    {
      "title": { "en": "B.Sc. in Electrical Engineering", "pt": "Bacharelado em Engenharia Elétrica" },
      "period": "2018–2023",
      "org": "Instituto Federal do Espírito Santo",
      "description": { "en": "Bachelor of Science in Electrical Engineering.", "pt": "Bacharelado em Engenharia Elétrica." }
    }
  ],
  "experience": [
    {
      "title": { "en": "Instructor — programming applied to robotics", "pt": "Professor — programação aplicada à robótica" },
      "period": "Aug 2022 – Jun 2023",
      "org": "Instituto Federal do Espírito Santo",
      "description": {
        "en": "Instructor and mentor for the 'Meninas Programadoras' project, training 9th-grade female students from public schools in Guarapari and Anchieta (ES) in programming and educational robotics.",
        "pt": "Professor e monitor do projeto 'Meninas Programadoras', capacitando estudantes do 9º ano de escolas públicas de Guarapari e Anchieta (ES) em programação e robótica educacional."
      }
    },
    {
      "title": { "en": "IT internship", "pt": "Estágio em TI" },
      "period": "Jun 2023 – Jul 2023",
      "org": "Instituto Federal do Espírito Santo — Campus Guarapari",
      "description": {
        "en": "Supported IT operations at the IFES Guarapari campus.",
        "pt": "Apoio às demandas do setor de TI do campus Guarapari do IFES."
      }
    },
    {
      "title": { "en": "Coordinator — Smart Cane Project", "pt": "Coordenador — Projeto Bengala Inteligente" },
      "period": "Jul 2022 – Dec 2022",
      "org": "Instituto Federal do Espírito Santo",
      "description": {
        "en": "Co-supervised student project; guided students through Arduino study and prototype development of the smart cane.",
        "pt": "Co-supervisor do projeto; orientei os estudantes no estudo de Arduino e no desenvolvimento do protótipo da bengala."
      }
    }
  ]
}
```

- [ ] **Step 2: Criar `src/components/Background.astro`**

Create `src/components/Background.astro`:

```astro
---
import { t, type Locale } from '../i18n';
import bg from '../data/background.json';
interface Props { locale: Locale }
const { locale } = Astro.props;
const dict = t(locale);

function localized<T extends { en: string; pt: string }>(v: T): string {
  return v[locale];
}
---
<section class="section" id="background">
  <p class="label">{dict.sections.background}</p>

  <h2 style="margin-bottom:16px">{dict.background.education}</h2>
  <ol style="list-style:none;padding:0;margin:0 0 32px">
    {bg.education.map((e) => (
      <li style="padding:14px 0;border-top:1px solid var(--line)">
        <h3>{localized(e.title)}</h3>
        <p style="color:var(--muted);font-size:13px;margin:4px 0">{e.period} · {e.org}</p>
        <p style="font-size:14px">{localized(e.description)}</p>
      </li>
    ))}
  </ol>

  <h2 style="margin-bottom:16px">{dict.background.experience}</h2>
  <ol style="list-style:none;padding:0;margin:0">
    {bg.experience.map((e) => (
      <li style="padding:14px 0;border-top:1px solid var(--line)">
        <h3>{localized(e.title)}</h3>
        <p style="color:var(--muted);font-size:13px;margin:4px 0">{e.period} · {e.org}</p>
        <p style="font-size:14px">{localized(e.description)}</p>
      </li>
    ))}
  </ol>

  <p style="margin-top:32px">
    <a href="/cv/Jose Zouain CV.pdf" target="_blank" rel="noopener">{dict.background.cta_full_cv} ↓</a>
  </p>
</section>
```

- [ ] **Step 3: Incluir nas páginas (após Languages)**

Edit `src/pages/index.astro` — import + `<Background locale="en" />` após `<Languages ... />`.
Edit `src/pages/pt/index.astro` — o mesmo com `locale="pt"` e caminhos `../..`.

- [ ] **Step 4: Build + verificar**

```bash
npm run build:no-fetch
grep -q "Meninas Programadoras" dist/pt/index.html && echo OK
```

Expected: `OK`.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: Background section with bilingual education + experience"
```

---

## Task 9: Componente `Contact`

**Files:**
- Create: `src/components/Contact.astro`
- Modify: `src/pages/index.astro`, `src/pages/pt/index.astro`

- [ ] **Step 1: Criar `src/components/Contact.astro`**

Create `src/components/Contact.astro`:

```astro
---
import { t, type Locale } from '../i18n';
interface Props { locale: Locale }
const { locale } = Astro.props;
const dict = t(locale);
---
<section class="section" id="contact">
  <p class="label">{dict.sections.contact}</p>
  <p style="font-size:17px">
    <a href="mailto:zezouain@gmail.com">zezouain@gmail.com</a>
  </p>
  <p style="margin-top:12px;display:flex;gap:20px;flex-wrap:wrap;font-size:14px">
    <a href="https://github.com/eduardochamp1" target="_blank" rel="noopener">GitHub ↗</a>
    <a href="https://www.linkedin.com/in/joseeduardozouain/" target="_blank" rel="noopener">LinkedIn ↗</a>
  </p>
</section>
```

- [ ] **Step 2: Incluir nas páginas**

Edit `src/pages/index.astro` — `<Contact locale="en" />` no final.
Edit `src/pages/pt/index.astro` — mesmo, `locale="pt"`.

- [ ] **Step 3: Build**

```bash
npm run build:no-fetch
```

Expected: OK.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: Contact section"
```

---

## Task 10: Componente `ProfileReadme` opcional

**Files:**
- Create: `src/components/ProfileReadme.astro`
- Modify: `scripts/fetch-github.mjs`, `src/pages/index.astro`, `src/pages/pt/index.astro`

- [ ] **Step 1: Estender `fetch-github.mjs` pra pegar o README do perfil**

Edit `scripts/fetch-github.mjs` — dentro de `main()`, antes de escrever o `out`:

```js
  let profileReadmeHtml = null;
  try {
    const readme = await fetch(`https://api.github.com/repos/${USER}/${USER}/readme`, {
      headers: { ...headers, accept: 'application/vnd.github.html' },
    });
    if (readme.ok) profileReadmeHtml = await readme.text();
  } catch { /* silently skip */ }
```

E adicionar `profile_readme: profileReadmeHtml` ao objeto `out`.

- [ ] **Step 2: Criar `src/components/ProfileReadme.astro`**

Create `src/components/ProfileReadme.astro`:

```astro
---
let data: { profile_readme: string | null } | null = null;
try { data = (await import('../data/github.json')).default as any; } catch {}
const html = data?.profile_readme;
---
{html && (
  <section class="section" id="profile-readme">
    <div class="readme" set:html={html}></div>
    <style>
      .readme :global(img) { max-width:100%; height:auto; }
      .readme :global(h1), .readme :global(h2) { margin-top:24px; }
      .readme :global(pre) { background:var(--surface); padding:12px; overflow:auto; }
    </style>
  </section>
)}
```

- [ ] **Step 3: Incluir nas páginas (depois de Hero, antes de Now)**

Edit `src/pages/index.astro` — import + `<ProfileReadme />` (sem locale — o README é único).
Edit `src/pages/pt/index.astro` — mesmo.

- [ ] **Step 4: Rodar fetch e build**

```bash
node scripts/fetch-github.mjs
npm run build:no-fetch
```

Se o repo `eduardochamp1/eduardochamp1` não existir, `profile_readme` fica `null` e a seção não aparece — verificar: `grep -c "profile-readme" dist/index.html` = 0 nesse caso, ou = 1 se existir.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: optional profile README rendering when repo exists"
```

---

## Task 11: GitHub Actions — build + deploy diário

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Habilitar Pages via Actions no repo**

Manual (uma vez): abrir Settings → Pages no GitHub, selecionar "Source: GitHub Actions". Sem isso, o workflow falha no deploy.

- [ ] **Step 2: Criar `.github/workflows/deploy.yml`**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy site

on:
  push:
    branches: [master]
  schedule:
    - cron: '0 6 * * *'   # daily 06:00 UTC
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Check i18n parity
        run: npm run check:i18n
      - name: Fetch GitHub data
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: node scripts/fetch-github.mjs
      - name: Build
        run: npm run build:no-fetch
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Commit (ainda no branch)**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: deploy workflow — daily build + push-triggered"
```

---

## Task 12: Merge pra `master` + validação em produção

**Files:**
- Nenhum novo. Trabalho no git + validação manual.

- [ ] **Step 1: Verificar checklist antes do merge**

```bash
npm run check:i18n
node scripts/fetch-github.mjs
npm run build:no-fetch
```

Todos passam. Abrir `dist/index.html` e `dist/pt/index.html` no browser localmente (`npx serve dist`) e clicar em cada link/seção.

- [ ] **Step 2: Auditar Lighthouse (opcional local; obrigatório após deploy)**

```bash
npx serve dist
```

Abrir DevTools → Lighthouse → gerar report. Metas: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95. Registrar scores no PR/commit.

- [ ] **Step 3: Merge no master**

```bash
git checkout master
git merge --no-ff redesign-astro -m "feat: rebuild portfolio with Astro — live data, bilingual, minimalist"
git push origin master
```

- [ ] **Step 4: Acompanhar a Action**

```bash
gh run watch
```

Ou abrir a aba Actions no GitHub. Aguardar build + deploy verdes (~2 min).

- [ ] **Step 5: Verificar produção**

Abrir https://eduardochamp1.github.io e https://eduardochamp1.github.io/pt/. Confirmar: dados do GitHub aparecem, toggle EN/PT funciona, CV baixa, nenhum request externo (DevTools Network → Third-party filter deve estar vazio exceto o próprio origin).

- [ ] **Step 6: Deletar branch local + remoto**

```bash
git branch -d redesign-astro
git push origin --delete redesign-astro
```

---

## Verificação final

- [ ] Site em produção com dados dinâmicos do GitHub
- [ ] Toggle EN/PT funcional em todas as seções
- [ ] `now.md` editável → basta commit + push pra atualizar
- [ ] Workflow Actions rodando diariamente às 06:00 UTC
- [ ] Zero CDN externo no Network tab
- [ ] Lighthouse ≥ 95 nas 4 categorias
- [ ] `docs/superpowers/specs/2026-08-25-portfolio-vivo-design.md` e este plano commitados
