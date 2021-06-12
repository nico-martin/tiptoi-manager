import React from 'react';
import { productCategories } from '@app/database';

import './FileFinderForm.css';

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
    <div className="file-finder-form">
      <input
        onKeyUp={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        name="searchTerm"
        id="searchTerm"
        type="text"
        className="file-finder-form__searchterm"
        placeholder="search.."
      />
      <ul className="file-finder-form__categories">
        <li className="file-finder-form__category">
          <label className="file-finder-form__category-label">
            <input
              type="checkbox"
              name="all"
              onClick={(e) =>
                setCheckedCategories(
                  (e.target as HTMLInputElement).checked
                    ? productCategories
                    : []
                )
              }
              checked={checkedCategories.length === productCategories.length}
              className="file-finder-form__category-input"
            />{' '}
            Alle
          </label>
        </li>
        {productCategories.map((cat) => (
          <li className="file-finder-form__category">
            <label className="file-finder-form__category-label">
              <input
                type="checkbox"
                name={cat}
                onClick={(e) =>
                  setCheckedCategories(
                    (e.target as HTMLInputElement).checked
                      ? [...checkedCategories, cat]
                      : checkedCategories.filter((c) => c !== cat)
                  )
                }
                checked={checkedCategories.includes(cat)}
                className="file-finder-form__category-input"
              />{' '}
              {cat}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileFinderForm;
