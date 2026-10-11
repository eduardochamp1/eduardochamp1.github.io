const root = document.documentElement;
const btn = document.querySelector<HTMLButtonElement>('[data-theme-toggle]');
const current = () => root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const label = () => { if (btn) btn.textContent = current() === 'dark' ? btn.dataset.labelLight! : btn.dataset.labelDark!; };

label();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
btn?.addEventListener('click', () => {
  const next = current() === 'dark' ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('cv-theme', next); } catch {}
  label();
  document.dispatchEvent(new CustomEvent('cv:theme'));
});
