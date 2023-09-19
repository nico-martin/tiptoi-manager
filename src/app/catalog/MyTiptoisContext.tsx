import React from 'react';

import { useGmeFileStore } from '@app/storage/StorageContext.tsx';
import { SavedProduct } from '@app/storage/gmeFilesDB.ts';

export enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

const MyTiptoisContext = React.createContext<{
  state: STATE;
  products: Array<SavedProduct>;
}>({
  state: STATE.IDLE,
  products: [],
});

export const MyTiptoisContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const [state, setState] = React.useState<STATE>(STATE.IDLE);
  const { fileKeys, getFile } = useGmeFileStore();
  const [products, setProducts] = React.useState<Array<SavedProduct>>([]);

  React.useEffect(() => {
    setState(STATE.LOADING);
    Promise.all(fileKeys.map((key) => getFile(key)))
      .then((products) => {
        setProducts(products);
        setState(STATE.SUCCESS);
      })
      .catch(() => setState(STATE.ERROR));
  }, [fileKeys]);

  return (
    <MyTiptoisContext.Provider value={{ state, products }}>
      {children}
    </MyTiptoisContext.Provider>
  );
};

export const useMyTiptois = () => React.useContext(MyTiptoisContext);
