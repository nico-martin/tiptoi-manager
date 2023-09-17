import { Language } from './types.ts';

export const getLanguageISO = (language: Language): string =>
  language === 'de' ? 'de_DE' : language === 'fr' ? 'fr_FR' : 'de_DE';
