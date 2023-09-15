import React from 'react';

import FileFinderForm from '@app/FileFinderForm';
import FileFinderProduct from '@app/FileFinderProduct';
import { ProductI, productCategories, products } from '@app/database';

import cn from '@utils/classnames';

import styles from './FileFinder.module.css';

const FileFinder: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [checkedCategories, setCheckedCategories] =
    React.useState<Array<string>>(productCategories);

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
      <h2 className={styles.title}>Searchfilter</h2>
      <FileFinderForm
        setSearchTerm={setSearchTerm}
        checkedCategories={checkedCategories}
        setCheckedCategories={setCheckedCategories}
      />
      <h2 className={cn(styles.title, styles.titleProducts)}>Products</h2>
      <div className={styles.list}>
        {results.map((product) => (
          <FileFinderProduct className={styles.listItem} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FileFinder;
