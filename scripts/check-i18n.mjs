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
