// Rede viva: experiências e competências como nós conectados (força simples + pulsos).
import { readColors, onTheme, toggleSkill, goTo, getSkill, type Colors } from './cv-state';

export type Graph = {
  entries: { id: string; type: string; label: string; skills: string[] }[];
  skills: { id: string; label: string }[];
};
type Node = { id: string; kind: 'exp' | 'skill'; type?: string; label: string; x: number; y: number; vx: number; vy: number; r: number; ph: number };

export function initNetwork(canvas: HTMLCanvasElement, box: HTMLElement, graph: Graph) {
  const ctx = canvas.getContext('2d')!;
  let W = 600, H = 520, dpr = 1, visible = true, last = 0, hover = -1, sel: string | null = null;
  let mouse: { x: number; y: number } | null = null;
  let col: Colors = readColors();
  onTheme(() => { col = readColors(); });

  const nodes: Node[] = [];
  const idx: Record<string, number> = {};
  const edges: { a: number; b: number }[] = [];
  let pulses: { e: { a: number; b: number }; p: number; dir: number; sp: number }[] = [];
  let hiSkill: Set<number> | null = null;

  function build() {
    graph.entries.forEach((e, i) => {
      const a = (i / graph.entries.length) * Math.PI * 2;
      idx[e.id] = nodes.length;
      nodes.push({ id: e.id, kind: 'exp', type: e.type, label: e.label, x: W / 2 + Math.cos(a) * W * 0.3, y: H / 2 + Math.sin(a) * H * 0.3, vx: 0, vy: 0, r: e.type === 'work' ? 8 : e.type === 'cert' ? 4.5 : 6.5, ph: Math.random() * 6.28 });
    });
    graph.skills.forEach(s => {
      idx[s.id] = nodes.length;
      nodes.push({ id: s.id, kind: 'skill', label: s.label, x: W / 2 + (Math.random() - 0.5) * W * 0.5, y: H / 2 + (Math.random() - 0.5) * H * 0.5, vx: 0, vy: 0, r: 3.5, ph: Math.random() * 6.28 });
    });
    graph.entries.forEach(e => e.skills.forEach(s => { if (idx[s] != null) edges.push({ a: idx[e.id], b: idx[s] }); }));
  }
  const neighbors = (i: number) => {
    const set = new Set([i]);
    edges.forEach(e => { if (e.a === i) set.add(e.b); if (e.b === i) set.add(e.a); });
    return set;
  };
  const computeHi = () => { const sk = getSkill(); hiSkill = sk && idx[sk] != null ? neighbors(idx[sk]) : null; };

  function resize() {
    const r = box.getBoundingClientRect();
    const oW = W, oH = H;
    W = Math.max(200, r.width); H = Math.max(200, r.height);
    dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    nodes.forEach(n => { n.x *= W / oW; n.y *= H / oH; });
  }

  function tick() {
    requestAnimationFrame(tick);
    if (!visible) return;
    const t = performance.now(), N = nodes;
    const hi = hiSkill || (hover >= 0 ? neighbors(hover) : null);
    const sk = getSkill();
    const focus = hiSkill && sk ? idx[sk] : hover;

    for (let i = 0; i < N.length; i++) {
      const a = N[i];
      for (let j = i + 1; j < N.length; j++) {
        const b = N[j];
        let dx = b.x - a.x, dy = b.y - a.y; const d2 = dx * dx + dy * dy + 0.01;
        if (d2 > 50000) continue;
        const dd = Math.sqrt(d2), f = 700 / d2;
        dx /= dd; dy /= dd;
        a.vx -= dx * f; a.vy -= dy * f; b.vx += dx * f; b.vy += dy * f;
      }
    }
    const L0 = Math.min(W, H) * 0.17;
    for (const e of edges) {
      const a = N[e.a], b = N[e.b];
      const dx = b.x - a.x, dy = b.y - a.y, dd = Math.sqrt(dx * dx + dy * dy) + 0.01;
      const f = (dd - L0) * 0.0025;
      a.vx += dx / dd * f; a.vy += dy / dd * f; b.vx -= dx / dd * f; b.vy -= dy / dd * f;
    }
    N.forEach((n, i) => {
      let g = 0.0022;
      if (hiSkill) g = hiSkill.has(i) ? 0.01 : -0.0012;
      n.vx += (W / 2 - n.x) * g; n.vy += (H / 2 - n.y) * g * 1.3;
      n.vx += Math.sin(t * 0.0006 + n.ph) * 0.03;
      n.vy += Math.cos(t * 0.0005 + n.ph * 1.3) * 0.03;
      if (mouse) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 4900 && d2 > 1) { const dd = Math.sqrt(d2), f = (1 - dd / 70) * 0.35; n.vx += dx / dd * f; n.vy += dy / dd * f; }
      }
      n.vx *= 0.86; n.vy *= 0.86;
      n.x = Math.max(24, Math.min(W - 24, n.x + n.vx));
      n.y = Math.max(36, Math.min(H - 20, n.y + n.vy));
    });

    if (t - last > 150) {
      last = t;
      const pool = hi ? edges.filter(e => e.a === focus || e.b === focus) : edges;
      if (pool.length) pulses.push({ e: pool[Math.floor(Math.random() * pool.length)], p: 0, dir: Math.random() < 0.5 ? 1 : -1, sp: 0.007 + Math.random() * 0.01 });
    }
    pulses = pulses.filter(p => (p.p += p.sp) < 1);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';
    for (const e of edges) {
      const a = N[e.a], b = N[e.b];
      const on = hi && (e.a === focus || e.b === focus);
      ctx.globalAlpha = on ? 0.8 : hi ? 0.05 : 0.22;
      ctx.strokeStyle = on ? col.accent : col.muted;
      ctx.lineWidth = on ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }
    ctx.fillStyle = col.accent; ctx.shadowColor = col.accent; ctx.shadowBlur = 10;
    for (const p of pulses) {
      if (hi && !(hi.has(p.e.a) && hi.has(p.e.b))) continue;
      const a = N[p.e.a], b = N[p.e.b], k = p.dir > 0 ? p.p : 1 - p.p;
      ctx.globalAlpha = Math.sin(p.p * Math.PI);
      ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * k, a.y + (b.y - a.y) * k, 2, 0, 6.283); ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
    N.forEach((n, i) => {
      const on = !hi || hi.has(i);
      const r = n.r * (1 + 0.1 * Math.sin(t * 0.002 + n.ph));
      ctx.globalAlpha = on ? 1 : 0.15;
      ctx.setLineDash([]);
      if (n.kind === 'exp') {
        if (n.type === 'work') {
          ctx.globalAlpha = (on ? 0.25 : 0.05) * (0.6 + 0.4 * Math.sin(t * 0.003 + n.ph));
          ctx.fillStyle = col.accent; ctx.beginPath(); ctx.arc(n.x, n.y, r + 6, 0, 6.283); ctx.fill();
          ctx.globalAlpha = on ? 1 : 0.15;
          ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.283); ctx.fill();
        } else if (n.type === 'cert') {
          ctx.fillStyle = col.surface; ctx.strokeStyle = col.fg; ctx.lineWidth = 1.2;
          ctx.fillRect(n.x - r, n.y - r, r * 2, r * 2); ctx.strokeRect(n.x - r, n.y - r, r * 2, r * 2);
        } else {
          ctx.fillStyle = col.surface; ctx.strokeStyle = n.type === 'edu' ? col.fg : col.accent; ctx.lineWidth = 1.5;
          if (n.type === 'viv') ctx.setLineDash([2.5, 2.5]);
          ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, 6.283); ctx.fill(); ctx.stroke();
          ctx.setLineDash([]);
        }
        if (n.id === sel) { ctx.strokeStyle = col.fg; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(n.x, n.y, r + 5, 0, 6.283); ctx.stroke(); }
      } else {
        ctx.fillStyle = i === focus ? col.accent : on && hi ? col.fg : col.muted;
        ctx.beginPath(); ctx.arc(n.x, n.y, i === focus ? r + 1.5 : r, 0, 6.283); ctx.fill();
      }
      const show = i === focus || i === hover || (hi ? hi.has(i) : n.kind === 'exp' && n.type !== 'cert');
      if (show) {
        ctx.globalAlpha = on ? 1 : 0.3;
        ctx.fillStyle = i === focus || i === hover ? col.fg : col.muted;
        const tw = ctx.measureText(n.label).width;
        ctx.fillText(n.label, n.x + r + 7 + tw > W - 6 ? n.x - r - 7 - tw : n.x + r + 7, n.y + 4);
      }
    });
    ctx.globalAlpha = 1;
  }

  function pick(ev: MouseEvent) {
    const r = canvas.getBoundingClientRect();
    const x = ev.clientX - r.left, y = ev.clientY - r.top;
    mouse = { x, y };
    let best = -1, bd = 1e9;
    nodes.forEach((n, i) => { const d = Math.hypot(n.x - x, n.y - y); if (d < n.r + 10 && d < bd) { bd = d; best = i; } });
    return best;
  }
  canvas.addEventListener('mousemove', ev => { hover = pick(ev); canvas.style.cursor = hover >= 0 ? 'pointer' : 'default'; });
  canvas.addEventListener('mouseleave', () => { hover = -1; mouse = null; });
  canvas.addEventListener('click', ev => {
    const i = pick(ev); if (i < 0) return;
    const n = nodes[i];
    if (n.kind === 'skill') toggleSkill(n.id); else goTo(n.id);
  });
  document.addEventListener('cv:skill', computeHi);
  document.addEventListener('cv:goto', (e: Event) => { sel = (e as CustomEvent).detail; });

  build();
  new ResizeObserver(resize).observe(box);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);
  resize();
  tick();
}
