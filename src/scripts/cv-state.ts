// Estado compartilhado: competência selecionada, navegação até um item e cores do tema.
let current: string | null = null;

export const getSkill = () => current;

export function setSkill(id: string | null) {
  current = id;
  if (id) document.documentElement.dataset.skill = id;
  else delete document.documentElement.dataset.skill;
  document.dispatchEvent(new CustomEvent('cv:skill', { detail: id }));
}

export const toggleSkill = (id: string) => setSkill(current === id ? null : id);

export const goTo = (id: string) => document.dispatchEvent(new CustomEvent('cv:goto', { detail: id }));

export type Colors = { bg: string; fg: string; muted: string; line: string; surface: string; accent: string; dark: boolean };

export function readColors(): Colors {
  const s = getComputedStyle(document.documentElement);
  const g = (k: string) => s.getPropertyValue(k).trim();
  const bg = g('--bg');
  const hex = bg.replace('#', '');
  const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16);
  return { bg, fg: g('--fg'), muted: g('--muted'), line: g('--line'), surface: g('--surface'), accent: g('--accent'), dark: r < 128 };
}

export function onTheme(cb: () => void) {
  document.addEventListener('cv:theme', cb);
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', cb);
}

export const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
