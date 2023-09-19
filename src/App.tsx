import { Button, Notification } from '@theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useIntl } from 'react-intl';

import FileFinder from '@app/FileFinder/FileFinder.tsx';
import MyTiptois from '@app/FileFinder/MyTiptois.tsx';
import { FilesContextProvider } from '@app/FilesContext';
import Header from '@app/Header';
import Pen from '@app/Pen/Pen.tsx';
import { CatalogContextProvider } from '@app/catalog/CatalogContext.tsx';
import { MyTiptoisContextProvider } from '@app/catalog/MyTiptoisContext.tsx';
import { StorageContextProvider } from '@app/storage/StorageContext.tsx';

import cn from '@utils/classnames.ts';

import styles from './App.module.css';
import { IntlContextProvider } from './intl/IntlContext.tsx';

enum SCREENS {
  CATALOG = 'catalog',
  MY = 'my',
}

const App = () => {
  const { formatMessage } = useIntl();
  const [activeScreen, setActiveScreen] = React.useState<SCREENS>(
    SCREENS.CATALOG
  );

  return (
    <article className={styles.root}>
      <Header className={styles.header} />
      <main className={styles.main}>
        {!('showDirectoryPicker' in window) ? (
          <Notification className={styles.error} type="error">
            {formatMessage({ id: 'support.warning' })}
          </Notification>
        ) : (
          <React.Fragment>
            <Pen className={styles.pen} />
            <div className={styles.filefinder}>
              <nav className={styles.nav}>
                {Object.values(SCREENS).map((value) => (
                  <Button
                    layout="ghost"
                    color="black"
                    onClick={() => setActiveScreen(value)}
                    key={value}
                    className={cn(styles.navElement, {
                      [styles.navElementActive]: activeScreen === value,
                    })}
                  >
                    {formatMessage({ id: `app.nav.${value}` })}
                  </Button>
                ))}
              </nav>
              {activeScreen === SCREENS.CATALOG && <FileFinder />}
              {activeScreen === SCREENS.MY && (
                <MyTiptois className={styles.mytiptois} />
              )}
            </div>
          </React.Fragment>
        )}
      </main>
    </article>
  );
};

const root = document.getElementById('app');

root &&
  ReactDOM.createRoot(root).render(
    <IntlContextProvider>
      <StorageContextProvider>
        <CatalogContextProvider>
          <FilesContextProvider>
            <MyTiptoisContextProvider>
              <App />
            </MyTiptoisContextProvider>
          </FilesContextProvider>
        </CatalogContextProvider>
      </StorageContextProvider>
    </IntlContextProvider>
  );
