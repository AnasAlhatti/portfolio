import { describe, expect, it } from 'vitest';
import { translations } from '../content/translations.js';

function paths(value, prefix = '') {
  return Object.entries(value).flatMap(([key, item]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return item && typeof item === 'object' ? paths(item, next) : [next];
  }).sort();
}

describe('bilingual content', () => {
  it('provides matching keys for every English and Turkish translation', () => {
    expect(paths(translations.tr)).toEqual(paths(translations.en));
  });
  it('does not leave empty interface or editorial translations', () => {
    for (const locale of Object.values(translations)) {
      for (const key of paths(locale)) {
        expect(key.split('.').reduce((node, part) => node[part], locale), key).not.toBe('');
      }
    }
  });
});
