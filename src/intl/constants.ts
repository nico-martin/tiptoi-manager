import deMessages from './de.json';
import enMessages from './en.json';
import frMessages from './fr.json';

export const MESSAGES: Record<string, Record<string, string>> = {
  en: enMessages,
  de: deMessages,
  fr: frMessages,
} as const;

export const COOKIE_NAME = 'language';
