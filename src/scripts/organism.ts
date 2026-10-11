// Hero: galhos que crescem de baixo para cima, balançam e conduzem pulsos de energia.
import { readColors, onTheme, reducedMotion, type Colors } from './cv-state';

type Pt = { x: number; y: number };
type Path = { pts: Pt[]; depth: number; t0: number; done?: boolean };

export function initOrganism(canvas: HTMLCanvasElement, box: HTMLElement) {
  const ctx = canvas.getContext('2d')!;
  let W = 0, H = 0, dpr = 1, start = performance.now(), lastSpawn = 0, visible = true;
  let paths: Path[] = [], pulses: { path: Path; p: number }[] = [];
  let col: Colors = readColors();
  onTheme(() => { col = readColors(); });
  const speed = 0.11;

  function grow(x: number, y: number, ang: number, len: number, depth: number, t0: number) {
    if (paths.length > 260) return;
    const pts: Pt[] = [{ x, y }];
    const kids: [number, number, number, number, number, number][] = [];
    let a = ang;
    const steps = Math.floor(len / 6);
    for (let s = 0; s < steps; s++) {
      a += (Math.random() - 0.5) * 0.28;
      a += (-Math.PI / 2 - a) * 0.02;
      x += Math.cos(a) * 6; y += Math.sin(a) * 6;
      pts.push({ x, y });
      if (depth < 4 && s > 4 && Math.random() < 0.055) {
        kids.push([x, y, a + (Math.random() < 0.5 ? -1 : 1) * (0.45 + Math.random() * 0.5), len * (0.45 + Math.random() * 0.25), depth + 1, t0 + (s * 6) / speed]);
      }
    }
    paths.push({ pts, depth, t0 });
    kids.forEach(k => grow(...k));
  }

  function build() {
    paths = []; pulses = []; start = performance.now();
    const n = Math.max(4, Math.round(W / 110));
    for (let i = 0; i < n; i++) {
      grow(W * (i + 0.5) / n + (Math.random() - 0.5) * 60, H + 6, -Math.PI / 2 + (Math.random() - 0.5) * 0.6, H * (0.35 + Math.random() * 0.5), 0, reducedMotion() ? -1e6 : Math.random() * 900);
    }
  }

  function resize() {
    const r = box.getBoundingClientRect();
    const changed = Math.abs(r.width - W) > 40 || !paths.length;
    W = r.width; H = r.height; dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = W * dpr; canvas.height = H * dpr;
    if (changed) build();
  }

  function draw() {
    requestAnimationFrame(draw);
    if (!visible || !W) return;
    const t = performance.now(), el = t - start;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const base = col.dark ? 0.32 : 0.45;
    const sway = (p: Pt, d: number) => reducedMotion() ? 0 : Math.sin(t * 0.0007 + p.y * 0.012) * (d + 1) * 1.4;
    for (const path of paths) {
      const k = Math.min(path.pts.length, Math.floor(((el - path.t0) * speed) / 6) + 1);
      if (k < 2) continue;
      ctx.globalAlpha = Math.max(0.08, base - path.depth * 0.06);
      ctx.strokeStyle = col.accent;
      ctx.lineWidth = Math.max(0.6, 1.8 - path.depth * 0.35);
      ctx.beginPath();
      for (let i = 0; i < k; i++) { const p = path.pts[i]; const x = p.x + sway(p, path.depth); i ? ctx.lineTo(x, p.y) : ctx.moveTo(x, p.y); }
      ctx.stroke();
      const tip = path.pts[k - 1];
      path.done = k >= path.pts.length;
      ctx.globalAlpha = path.done ? 0.35 + 0.35 * Math.sin(t * 0.003 + tip.x) : 0.9;
      ctx.fillStyle = col.accent;
      ctx.beginPath(); ctx.arc(tip.x + sway(tip, path.depth), tip.y, path.done ? 1.6 : 2.2, 0, 6.283); ctx.fill();
    }
    if (!reducedMotion() && t - lastSpawn > 260) {
      lastSpawn = t;
      const pool = paths.filter(p => p.done && p.pts.length > 10);
      if (pool.length) pulses.push({ path: pool[Math.floor(Math.random() * pool.length)], p: 0 });
    }
    ctx.shadowColor = col.accent; ctx.shadowBlur = 12; ctx.fillStyle = col.accent;
    pulses = pulses.filter(pu => {
      pu.p += 0.9 / pu.path.pts.length;
      if (pu.p >= 1) return false;
      const pt = pu.path.pts[Math.floor(pu.p * (pu.path.pts.length - 1))];
      ctx.globalAlpha = Math.sin(pu.p * Math.PI);
      ctx.beginPath(); ctx.arc(pt.x + sway(pt, pu.path.depth), pt.y, 2.4, 0, 6.283); ctx.fill();
      return true;
    });
    ctx.shadowBlur = 0; ctx.globalAlpha = 1;
  }

  canvas.addEventListener('click', ev => {
    const r = canvas.getBoundingClientRect();
    grow(ev.clientX - r.left, ev.clientY - r.top, -Math.PI / 2 + (Math.random() - 0.5) * 1.6, 90 + Math.random() * 80, 1, performance.now() - start);
  });
  new ResizeObserver(resize).observe(box);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(box);
  resize();
  draw();
}
