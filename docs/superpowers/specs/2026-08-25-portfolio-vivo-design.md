# Portfólio vivo — design spec

**Data:** 2026-08-25
**Repositório:** `eduardochamp1/eduardochamp1.github.io`
**Site atual:** https://eduardochamp1.github.io

## Contexto

O site atual é um portfólio estático de um único `index.html` (template Bootstrap 3 + jQuery + ~10 libs), com conteúdo hardcoded. Ele funciona mas exige edição manual pra qualquer atualização (novo projeto, mudança de idade, novo repo).

O objetivo é substituí-lo por um portfólio que se atualiza sozinho a partir da atividade real no GitHub, com estética minimalista editorial, sem sacrificar simplicidade de manutenção.

## Objetivos

- **Audiência primária:** networking técnico (devs, engenheiros que chegam via GitHub/LinkedIn).
- **Audiências secundárias:** recrutadores CLT e clientes freelance (atendidas sem serem foco).
- **Baixa manutenção:** conteúdo dinâmico puxado no build; edição manual apenas em campos curados (Now, bio, background).
- **Bilíngue:** EN default, PT opcional via toggle.

## Não-objetivos

- Blog completo com CMS (fora de escopo — pode ser adicionado depois).
- Analytics / A/B testing.
- Comentários / interações sociais na página.
- SSR ou backend próprio — o site continua 100% estático no GitHub Pages.

## Stack

| Camada | Escolha | Motivo |
|---|---|---|
| Framework | Astro | Build estático, componentes reutilizáveis, integração natural com fetch de dados no build. |
| Hospedagem | GitHub Pages (`gh-pages` branch) | Já é onde o site vive. Zero mudança de infra. |
| Build/deploy | GitHub Actions | Roda diariamente + em cada push. Publica no `gh-pages`. |
| i18n | Astro i18n nativo (`i18n` config em `astro.config.mjs` + `getStaticPaths`) | Sem lib extra. Rotas `/` (EN) e `/pt/`. |
| Estilo | CSS puro com variáveis + `prefers-color-scheme` | Sem framework CSS. Mantém o pacote pequeno. |
| Fontes | Stack `system-ui, -apple-system, sans-serif` | Zero CDN, zero download; renderização instantânea. |

## Arquitetura

### Fluxo de dados

```
GitHub API ──┐
             ├─→ scripts/fetch-github.mjs ──→ src/data/github.json ──→ Astro build ──→ dist/ ──→ gh-pages
now.md ──────┤
i18n/*.json ─┘
```

- **Build time:** `fetch-github.mjs` chama a REST API (`/users/eduardochamp1/repos`) com token do secrets, agrega estatísticas de linguagens, salva em `src/data/github.json`. Astro consome esse arquivo em tempo de build.
- **Runtime:** zero. O HTML servido já contém todos os dados.
- **Frescor:** GitHub Actions rebuilda diariamente (cron `0 6 * * *`) + em cada push. Site fica no máximo 24 h defasado.

### Estrutura de arquivos

```
/
├── .github/workflows/deploy.yml       # build + deploy
├── astro.config.mjs
├── package.json
├── public/
│   ├── icon.ico
│   └── cv/Jose Zouain CV.pdf
├── scripts/
│   └── fetch-github.mjs               # roda antes do build
├── src/
│   ├── data/
│   │   ├── github.json                # gerado, gitignored
│   │   ├── now.md                     # editado à mão
│   │   └── background.json            # formação + experiência (curado)
│   ├── i18n/
│   │   ├── en.json
│   │   └── pt.json
│   ├── layouts/
│   │   └── Base.astro
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── Now.astro
│   │   ├── SelectedWork.astro
│   │   ├── Background.astro
│   │   ├── Languages.astro
│   │   ├── ProfileReadme.astro        # renderiza se existir
│   │   ├── Contact.astro
│   │   └── LanguageToggle.astro
│   ├── pages/
│   │   ├── index.astro                # EN
│   │   └── pt/index.astro             # PT
│   └── styles/
│       └── global.css
└── docs/superpowers/specs/            # este spec
```

## Seções da página (top-to-bottom)

Cada seção tem uma âncora acessível pelo menu superior fixo.

### 1. Hero

- Nome grande (48-64 px), peso 700, tracking negativo.
- Título hero: `Electrical Engineer × Developer`. O `×` recebe a cor de acento `#8bc34a` (verde-limão herdado do tema atual).
- Sub-linha: localização (`Guarapari, BR`) + email como `mailto:`.
- Barra de ações: botão "Download CV" (destaque), links `GitHub` e `LinkedIn` (texto, não ícone-só).
- Toggle EN/PT no topo direito da navegação.

### 2. Now

- Uma seção pequena (2-4 linhas).
- Conteúdo lido de `src/data/now.md` (markdown simples: você edita e faz commit).
- Data da última atualização exibida discretamente (usa `git log -1 --format=%cd -- src/data/now.md` no build).
- Serve como "sinal de vida": mostra que a página é cuidada.

### 3. Selected work (auto)

- Grade responsiva (1 col mobile, 2 cols tablet, 3 cols desktop).
- **6 repos** mais recentemente atualizados (filtro: `!fork && !archived`).
- Cada card: nome do repo → link, descrição, linguagem principal (dot colorido), ⭐ stars.
- Origem: `src/data/github.json` gerado no build.
- Fallback: se a API falhar durante o build, o build usa o `github.json` do commit anterior (não quebra).

### 4. Background

- Timeline vertical: formação + experiência (dados curados em `src/data/background.json`).
- Mesmo conteúdo do CV atual, migrado 1:1.
- Botão "Download full CV" no final, apontando pra `/cv/Jose Zouain CV.pdf`.

### 5. Languages

- Barra horizontal 100% dividida em segmentos coloridos por linguagem, com % e nome.
- Dados agregados a partir do endpoint `/repos/{owner}/{repo}/languages` de cada repo público.
- Máximo 6 linguagens; resto agregado como "Other".
- Cor de cada linguagem: paleta GitHub Linguist (mapa embutido no `fetch-github.mjs`).

### 6. Profile README (opcional)

- Se o repo `eduardochamp1/eduardochamp1` existir e tiver `README.md`, ele é renderizado aqui.
- Se não existir, a seção é omitida silenciosamente (nem título aparece).
- Renderização: `@astrojs/markdown-remark` + sanitização.

### 7. Contact

- Rodapé simples: email `mailto:` + GitHub + LinkedIn + copyright.

## Fluxo de i18n

- Rotas: `/` (EN) e `/pt/` (PT).
- Textos estáticos em `src/i18n/en.json` e `pt.json` (mesma estrutura de chaves).
- Toggle no header: dois links `EN` / `PT` (o ativo com sublinhado). Sem JS necessário.
- Conteúdo dinâmico (repos, README) exibido no idioma original.
- `now.md` pode ter duas variantes (`now.en.md`, `now.pt.md`) ou fallback pra uma única.

## Auto-atualização (GitHub Actions)

```yaml
name: Deploy site
on:
  push: { branches: [master] }
  schedule: [{ cron: '0 6 * * *' }]   # diário 06:00 UTC
  workflow_dispatch:
jobs:
  build:
    runs-on: ubuntu-latest
    permissions: { contents: read, pages: write, id-token: write }
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20' }
      - run: npm ci
      - run: node scripts/fetch-github.mjs
        env: { GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }} }
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages }
    steps:
      - uses: actions/deploy-pages@v4
```

- `secrets.GITHUB_TOKEN` é fornecido automaticamente pelo Actions — 5000 req/h autenticados.
- Se `fetch-github.mjs` falhar, o job falha; o site anterior continua no ar (o deploy só substitui em caso de sucesso).

## Migração

- **Branch de trabalho:** `redesign-astro`.
- **Preservar:** `cv/Jose Zouain CV.pdf`, `icon.ico`, favicon.
- **Descartar:** todos os `js/*`, `css/*`, template Bootstrap, imagens de portfólio (serão substituídas por screenshots capturados dos próprios sites, se o repo tiver — senão só o link).
- **`master` continua servindo o site antigo** até o merge. Após aprovação visual, `master` recebe o novo site e `gh-pages` é atualizado.

## Riscos & mitigações

| Risco | Mitigação |
|---|---|
| API do GitHub muda schema | Snapshot `github.json` versionado (commitado no branch) como fallback. |
| Rate limit no build | Auth via `GITHUB_TOKEN` (5k/h) — mais que suficiente. |
| Astro build quebra por dependência | Lockfile commitado; workflow pinado em node 20. |
| Tradução PT desatualizada em relação a EN | Chaves i18n com validação no build: erro se `pt.json` tiver menos chaves que `en.json`. |
| Perder projetos antigos que não estão mais no GitHub | Curadoria manual dos "featured": arquivo `src/data/featured.json` opcional que sobrescreve o auto. |

## Sucesso

O projeto é bem-sucedido quando:

1. `git push` no `master` atualiza o site em <5 min sem intervenção manual.
2. Adicionar um repo novo no GitHub o faz aparecer em até 24 h (ou instantâneo via `workflow_dispatch`).
3. Editar `now.md` + push atualiza a seção "Now" sem tocar em mais nada.
4. Lighthouse: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
5. Zero requests a CDNs externos em runtime (verificado no DevTools Network).

## Próximos passos após aprovação deste spec

Invocar `writing-plans` para gerar o plano de implementação incremental (setup Astro → migrar CV → seção auto de repos → i18n → workflow → deploy).
