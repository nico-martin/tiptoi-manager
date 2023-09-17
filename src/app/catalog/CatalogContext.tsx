import React from 'react';

import { useStorageContext } from '@app/storage/StorageContext.tsx';

import { apiGet } from '@utils/api/apiFetch.ts';
import { API_BASE } from '@utils/api/constants.ts';

import { useIntlContext } from '../../intl/IntlContext.tsx';
import { getLanguageISO } from '../../intl/functions.ts';
import { Catalog, ProductI } from './types.ts';

export enum STATE {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
  SUCCESS = 'success',
}

const CatalogContext = React.createContext<{
  state: STATE;
  products: Array<ProductI>;
  productCategories: Array<string>;
  gmeFilesIndices: Record<string, number>;
}>({
  state: STATE.IDLE,
  products: null,
  productCategories: null,
  gmeFilesIndices: null,
});

export const CatalogContextProvider: React.FC<{
  children: React.ReactElement;
}> = ({ children }) => {
  const { language } = useIntlContext();
  const [catalog, setCatalog] = React.useState<Catalog>(null);
  const [state, setState] = React.useState<STATE>(STATE.IDLE);
  const { getItem, setItem } = useStorageContext();

  const languageISO = React.useMemo(() => getLanguageISO(language), [language]);
  const loadCatalog = (languageISO: string) => {
    setState(STATE.LOADING);
    const stored = getItem(`catalog-${languageISO}`);
    if (stored) {
      setCatalog(JSON.parse(stored));
      setState(STATE.SUCCESS);
      return;
    }
    apiGet<Catalog>(`${API_BASE}api/getCatalog.php?language=${languageISO}`)
      .then(async (catalog) => {
        await setItem(`catalog-${languageISO}`, JSON.stringify(catalog));
        setCatalog(catalog);
        setState(STATE.SUCCESS);
      })
      .catch(() => setState(STATE.ERROR));
  };

  const products: Array<ProductI> = React.useMemo(
    () => catalog?.products || [],
    [catalog]
  );

  const productCategories: Array<string> = React.useMemo(
    () =>
      products
        .reduce((acc, product) => [...acc, ...product.categories], [])
        .reduce(
          (acc, product) => (acc.includes(product) ? acc : [...acc, product]),
          []
        ),
    [products]
  );

  const gmeFilesIndices: Record<string, number> = React.useMemo(
    () =>
      products.reduce(
        (acc, product, index) => ({
          ...acc,
          ...product.gameFiles.reduce(
            (acc, file) => ({ ...acc, [file.url.split('/').pop()]: index }),
            {}
          ),
        }),
        {}
      ),
    [products]
  );

  React.useEffect(() => {
    loadCatalog(languageISO);
  }, [languageISO]);

  return (
    <CatalogContext.Provider
      value={{ state, products, productCategories, gmeFilesIndices }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => React.useContext(CatalogContext);
