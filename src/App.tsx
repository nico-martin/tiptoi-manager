import { Notification } from '@theme';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useIntl } from 'react-intl';

import FileFinder from '@app/FileFinder/FileFinder.tsx';
import { FilesContextProvider } from '@app/FilesContext';
import Header from '@app/Header';
import Pen from '@app/Pen/Pen.tsx';
import { CatalogContextProvider } from '@app/catalog/CatalogContext.tsx';
import { StorageContextProvider } from '@app/storage/StorageContext.tsx';

import styles from './App.module.css';
import { IntlContextProvider } from './intl/IntlContext.tsx';

const App = () => {
  const { formatMessage } = useIntl();
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
            <FileFinder className={styles.filefinder} />
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
            <App />
          </FilesContextProvider>
        </CatalogContextProvider>
      </StorageContextProvider>
    </IntlContextProvider>
  );
