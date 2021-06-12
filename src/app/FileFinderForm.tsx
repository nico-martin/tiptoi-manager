import React from 'react';
import { productCategories } from '@app/database';

import './FileFinderForm.css';
import { FieldCheckbox } from '@theme';

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
      <h3 className="file-finder-form__titlecat">Categories</h3>
      <ul className="file-finder-form__categories">
        <li className="file-finder-form__category">
          <label className="file-finder-form__category-label">
            <FieldCheckbox
              name="all"
              id="all"
              value="all"
              label="Alle"
              onChange={(e) =>
                setCheckedCategories(
                  (e.target as HTMLInputElement).checked
                    ? productCategories
                    : []
                )
              }
              checked={checkedCategories.length === productCategories.length}
              className="file-finder-form__category-input"
            />
          </label>
        </li>
        {productCategories.map((cat) => (
          <li className="file-finder-form__category">
            <FieldCheckbox
              name={cat}
              id={cat}
              value={cat}
              label={cat}
              onChange={(e) =>
                setCheckedCategories(
                  (e.target as HTMLInputElement).checked
                    ? [...checkedCategories, cat]
                    : checkedCategories.filter((c) => c !== cat)
                )
              }
              checked={checkedCategories.includes(cat)}
              className="file-finder-form__category-input"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileFinderForm;
