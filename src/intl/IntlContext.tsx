import Cookies from 'cookies-ts';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { COOKIE_NAME, MESSAGES } from './constants.ts';
import { Language } from './types.ts';

const cookies = new Cookies();

const IntlContext = React.createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  languages: Array<Language>;
}>({
  language: Object.keys(MESSAGES)[0],
  setLanguage: () => {},
  languages: Object.keys(MESSAGES),
});

export const IntlContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [language, setLanguage] = React.useState<string>(
    Object.keys(MESSAGES)[0]
  );

  const messages = React.useMemo<Record<string, string>>(
    () => MESSAGES[language],
    [language]
  );

  React.useEffect(() => {
    const cookie = cookies.get(COOKIE_NAME);
    cookie && setLanguage(cookie);
  }, []);

  return (
    <IntlContext.Provider
      value={{
        language,
        setLanguage: (language) => {
          cookies.set(COOKIE_NAME, language);
          setLanguage(language);
        },
        languages: Object.keys(MESSAGES),
      }}
    >
      <IntlProvider locale={language} messages={messages}>
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};

export const useIntlContext = () => React.useContext(IntlContext);
