import { FieldCheckbox } from '@theme';
import React from 'react';
import { useIntl } from 'react-intl';

import { STATE, useCatalog } from '@app/catalog/CatalogContext.tsx';

import styles from './FileFinderForm.module.css';

const FileFinderForm: React.FC<{
  setSearchTerm: (term: string) => void;
  checkedCategories: Array<string>;
  setCheckedCategories: (categories: Array<string>) => void;
}> = ({ setSearchTerm, checkedCategories, setCheckedCategories }) => {
  const { productCategories, state } = useCatalog();
  const { formatMessage } = useIntl();
  return (
    <div className={styles.root}>
      <input
        onKeyUp={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        name="searchTerm"
        id="searchTerm"
        type="text"
        disabled={state !== STATE.SUCCESS}
        className={styles.searchterm}
        placeholder={formatMessage({ id: 'filter.search.placeholder' })}
      />
      {productCategories.length !== 0 && (
        <React.Fragment>
          <h3 className={styles.titlecat}>
            {formatMessage({ id: 'filter.search.categories.title' })}
          </h3>

          <ul className={styles.categories}>
            <li className={styles.category}>
              <label className={styles.categoryLabel}>
                <FieldCheckbox
                  name="all"
                  id="all"
                  value="all"
                  label={formatMessage({ id: 'filter.search.categories.all' })}
                  onChange={(e) => {
                    setCheckedCategories(
                      e.target.checked ? productCategories : []
                    );
                  }}
                  checked={
                    checkedCategories.length === productCategories.length
                  }
                  className={styles.categoryInput}
                />
              </label>
            </li>
            {productCategories.map((cat) => (
              <li className={styles.category} key={cat}>
                <FieldCheckbox
                  name={cat}
                  id={cat}
                  value={cat}
                  label={cat}
                  onChange={(e) => {
                    setCheckedCategories(
                      e.target.checked
                        ? [...checkedCategories, cat]
                        : checkedCategories.filter((c) => c !== cat)
                    );
                  }}
                  checked={checkedCategories.includes(cat)}
                  className={styles.categoryInput}
                />
              </li>
            ))}
          </ul>
        </React.Fragment>
      )}
    </div>
  );
};

export default FileFinderForm;
