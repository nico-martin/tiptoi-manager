import { Notification } from '@theme';
import React from 'react';
import ReactDOM from 'react-dom/client';

import FileFinder from '@app/FileFinder';
import { FilesContextProvider } from '@app/FilesContext';
import Header from '@app/Header';
import Pen from '@app/Pen';

import styles from './App.module.css';

const App = () => {
  return (
    <article className={styles.root}>
      <Header className={styles.header} />
      <main className={styles.main}>
        {!('showDirectoryPicker' in window) ? (
          <Notification className={styles.error} type="error">
            This app uses the "file access API", an experimental browser API
            that is currently only supported in the desktop versions of Chrome,
            Edge and Opera
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
    <FilesContextProvider>
      <App />
    </FilesContextProvider>
  );
