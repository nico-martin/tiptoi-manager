import { ProductImageI } from '@app/catalog/types.ts';
import { IDB_STORE_FILES } from '@app/storage/constants.ts';

import { base64Content, mimeType } from '@utils/functions.ts';

import { dbPromise } from './db.ts';

export interface SavedProduct {
  name: string;
  images: Array<ProductImageI>;
  audioFile: {
    fileName: string;
    fileContent: [base64Content, mimeType];
    url: string;
    version: string;
  };
}

type ValueType = SavedProduct;

export const get = async (key: string): Promise<ValueType> =>
  (await dbPromise).get(IDB_STORE_FILES, key);

export const set = async (key: string, val: ValueType) =>
  (await dbPromise).put(IDB_STORE_FILES, val, key);

export const del = async (key: string): Promise<void> =>
  (await dbPromise).delete(IDB_STORE_FILES, key);

export const clear = async (): Promise<void> =>
  (await dbPromise).clear(IDB_STORE_FILES);

export const getKeys = async (): Promise<Array<string>> =>
  (await dbPromise).getAllKeys(IDB_STORE_FILES);
