import { Loader, Notification } from '@theme';
import React from 'react';
import { useIntl } from 'react-intl';

import FileFinderForm from '@app/FileFinder/FileFinderForm.tsx';
import FileFinderProduct from '@app/FileFinder/FileFinderProduct.tsx';
import {
  STATE as CATALOG_STATE,
  useCatalog,
} from '@app/catalog/CatalogContext.tsx';
import { ProductI } from '@app/catalog/types.ts';

import cn from '@utils/classnames.ts';
import useOnline from '@utils/useOnline.ts';

import styles from './FileFinder.module.css';

const FileFinder: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const { state, products, productCategories } = useCatalog();
  const [checkedCategories, setCheckedCategories] =
    React.useState<Array<string>>(productCategories);
  const online = useOnline();

  React.useEffect(() => {
    setCheckedCategories(productCategories);
  }, [productCategories]);

  const { formatMessage } = useIntl();

  const results = React.useMemo<Array<ProductI>>(
    () =>
      products.filter(
        (product) =>
          product.categories.some((item) => checkedCategories.includes(item)) &&
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm, checkedCategories]
  );

  return (
    <div className={cn(className, styles.root)}>
      {online ? (
        <React.Fragment>
          <h2 className={styles.title}>
            {formatMessage({ id: 'filter.title' })}
          </h2>
          <FileFinderForm
            setSearchTerm={setSearchTerm}
            checkedCategories={checkedCategories}
            setCheckedCategories={setCheckedCategories}
          />
          <h2 className={cn(styles.title, styles.titleProducts)}>
            {formatMessage({ id: 'products.title' })}
          </h2>
          {state === CATALOG_STATE.LOADING || state === CATALOG_STATE.IDLE ? (
            <div className={styles.loaderContainer}>
              <Loader className={styles.loader} />
            </div>
          ) : state === CATALOG_STATE.ERROR ? (
            <Notification type="error" className={styles.error}>
              {formatMessage({ id: '_error' })}
            </Notification>
          ) : (
            <div className={styles.list}>
              {results.map((product) => (
                <FileFinderProduct
                  className={styles.listItem}
                  product={product}
                  key={product.id}
                />
              ))}
            </div>
          )}
        </React.Fragment>
      ) : (
        <Notification type="message">
          {formatMessage({ id: 'products.offline' })}
        </Notification>
      )}
    </div>
  );
};

export default FileFinder;
