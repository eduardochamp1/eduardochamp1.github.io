// Trajetória: a linha se energiza conforme a rolagem; anos navegáveis; cartões expansíveis.
const spine = document.querySelector<HTMLElement>('[data-spine]');

if (spine) {
  const fill = spine.querySelector<HTMLElement>('[data-fill]')!;
  const prog = document.querySelector<HTMLElement>('[data-prog]');
  const rows = [...spine.querySelectorAll<HTMLElement>('[data-row]')];
  const years = [...document.querySelectorAll<HTMLElement>('[data-year]')];
  let queued = 0;

  const update = () => {
    queued = 0;
    const r = spine.getBoundingClientRect();
    const tip = Math.max(0, Math.min(r.height, innerHeight * 0.62 - r.top));
    fill.style.height = tip + 'px';
    if (prog) prog.style.transform = `scaleX(${r.height ? tip / r.height : 0})`;
    let count = 0;
    rows.forEach((row, i) => { const on = row.offsetTop + 24 <= tip; row.classList.toggle('is-on', on); if (on) count = i + 1; });
    let active = -1;
    years.forEach((y, i) => { if (rows.findIndex(r => r.dataset.row === y.dataset.year) < count) active = i; });
    years.forEach((y, i) => { y.classList.toggle('is-active', i === active); y.classList.toggle('is-passed', i < active); });
  };
  const schedule = () => { if (!queued) queued = requestAnimationFrame(update); };

  const scrollToRow = (id: string) => {
    const el = rows.find(r => r.dataset.row === id); if (!el) return;
    scrollTo({ top: el.getBoundingClientRect().top + scrollY - 140, behavior: 'smooth' });
  };
  const setOpen = (row: HTMLElement, open: boolean) => {
    row.classList.toggle('is-open', open);
    const b = row.querySelector<HTMLButtonElement>('[data-expand]');
    if (b) { b.setAttribute('aria-expanded', String(open)); b.textContent = open ? b.dataset.lClose! : b.dataset.lOpen!; }
    schedule();
  };

  years.forEach(y => y.addEventListener('click', () => scrollToRow(y.dataset.year!)));
  spine.addEventListener('click', e => {
    const b = (e.target as Element).closest('[data-expand]');
    if (b) setOpen(b.closest<HTMLElement>('[data-row]')!, !b.closest('[data-row]')!.classList.contains('is-open'));
  });
  document.addEventListener('cv:goto', (e: Event) => {
    const id = (e as CustomEvent).detail as string;
    rows.forEach(r => r.classList.toggle('is-sel', r.dataset.row === id));
    const row = rows.find(r => r.dataset.row === id);
    if (row && row.querySelector('[data-expand]')) setOpen(row, true);
    requestAnimationFrame(() => scrollToRow(id));
  });

  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  update();
}
