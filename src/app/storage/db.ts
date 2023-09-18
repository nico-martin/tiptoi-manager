import { DBSchema, openDB } from 'idb';

import { IDB_NAME, IDB_STORE_FILES } from './constants.ts';
import { SavedProduct } from './gmeFilesDB.ts';

interface TipToiDB extends DBSchema {
  [IDB_STORE_FILES]: {
    key: string;
    value: SavedProduct;
  };
}

export const dbPromise = openDB<TipToiDB>(IDB_NAME, 1, {
  upgrade(db) {
    db.createObjectStore(IDB_STORE_FILES);
  },
});
