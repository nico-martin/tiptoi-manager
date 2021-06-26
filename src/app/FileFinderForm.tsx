import React from 'react';
import { FieldCheckbox } from '@theme';
import { productCategories } from '@app/database';
import styles from './FileFinderForm.css';

const FileFinderForm = ({
  setSearchTerm,
  checkedCategories,
  setCheckedCategories,
}: {
  setSearchTerm: (term: string) => void;
  checkedCategories: Array<string>;
  setCheckedCategories: (categories: Array<string>) => void;
}) => {
  return (
    <div className={styles.root}>
      <input
        onKeyUp={e => setSearchTerm((e.target as HTMLInputElement).value)}
        name="searchTerm"
        id="searchTerm"
        type="text"
        className={styles.searchterm}
        placeholder="search.."
      />
      <h3 className={styles.titlecat}>Categories</h3>
      <ul className={styles.categories}>
        <li className={styles.category}>
          <label className={styles.categoryLabel}>
            <FieldCheckbox
              name="all"
              id="all"
              value="all"
              label="Alle"
              onChange={e =>
                setCheckedCategories(
                  (e.target as HTMLInputElement).checked
                    ? productCategories
                    : []
                )
              }
              checked={checkedCategories.length === productCategories.length}
              className={styles.categoryInput}
            />
          </label>
        </li>
        {productCategories.map(cat => (
          <li className={styles.category}>
            <FieldCheckbox
              name={cat}
              id={cat}
              value={cat}
              label={cat}
              onChange={e =>
                setCheckedCategories(
                  (e.target as HTMLInputElement).checked
                    ? [...checkedCategories, cat]
                    : checkedCategories.filter(c => c !== cat)
                )
              }
              checked={checkedCategories.includes(cat)}
              className={styles.categoryInput}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileFinderForm;
