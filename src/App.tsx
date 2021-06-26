import React from 'react';
import ReactDOM from 'react-dom';
import { Notification } from '@theme';
import DirectoryPicker from '@app/DirectoryPicker';
import FileFinder from '@app/FileFinder';
import { FilesContextProvider, useDirHandle } from '@app/FilesContext';
import Header from '@app/Header';
import Pen from '@app/Pen';
import styles from './App.css';

const AppElement = document.querySelector(`#app`);

const App = () => {
  const [dirHandle] = useDirHandle();
  return (
    <article className={styles.root}>
      <Header className={styles.header} />
      <main className={styles.main}>
        {!('showDirectoryPicker' in window) ? (
          <Notification className={styles.error} type="error">
            This app uses the "file access API", an experimental browser API
            that is currently onyl supported in the desktop versions of Chrome,
            Edge and Opera
          </Notification>
        ) : !dirHandle ? (
          <DirectoryPicker />
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

if (AppElement) {
  ReactDOM.render(
    <FilesContextProvider>
      <App />
    </FilesContextProvider>,
    AppElement
  );
}
