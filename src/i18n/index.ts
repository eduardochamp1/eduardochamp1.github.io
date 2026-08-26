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
