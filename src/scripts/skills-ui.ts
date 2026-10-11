// Liga chips de competência, barra "usada em", pílula flutuante e destaque na trajetória.
import { toggleSkill, setSkill, goTo } from './cv-state';

type G = { entries: { id: string; label: string; skills: string[] }[]; skillLabel: Record<string, string>; points: string };
const el = document.getElementById('cv-graph');
const graph: G | null = el ? JSON.parse(el.textContent || '{}') : null;

document.addEventListener('click', e => {
  const t = e.target as Element;
  const chip = t.closest<HTMLElement>('[data-skill]');
  if (chip) { toggleSkill(chip.dataset.skill!); return; }
  if (t.closest('[data-skill-clear]')) setSkill(null);
});

document.addEventListener('cv:skill', (e: Event) => {
  const id = (e as CustomEvent).detail as string | null;
  document.querySelectorAll<HTMLElement>('[data-skill]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.skill === id)));

  const used = id && graph ? graph.entries.filter(en => en.skills.includes(id)) : [];
  const label = id && graph ? graph.skillLabel[id] : '';

  const bar = document.querySelector('[data-skillbar]');
  if (bar) {
    (bar.querySelector('[data-skillbar-empty]') as HTMLElement).hidden = !!id;
    (bar.querySelector('[data-skillbar-active]') as HTMLElement).hidden = !id;
    bar.querySelector('[data-skillbar-label]')!.textContent = label + ' →';
    bar.querySelector('[data-skillbar-list]')!.replaceChildren(...used.map(en => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'chip chip--sq'; b.textContent = en.label;
      b.addEventListener('click', () => goTo(en.id));
      return b;
    }));
  }

  const pill = document.querySelector<HTMLElement>('[data-skillpill]');
  if (pill) {
    pill.hidden = !id;
    pill.querySelector('[data-skillpill-label]')!.textContent = label;
    pill.querySelector('[data-skillpill-count]')!.textContent = `${used.length} ${graph?.points ?? ''}`;
  }

  document.querySelectorAll<HTMLElement>('[data-row]').forEach(r => {
    const m = !id || (r.dataset.skills || '').split(' ').includes(id);
    r.classList.toggle('is-dim', !m);
    r.classList.toggle('is-hit', !!id && m);
  });
});
