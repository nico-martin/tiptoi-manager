import React from 'react';

import { products, productCategories, ProductI } from '@app/database';
import cn from '@utils/classnames';
import FileFinderProduct from '@app/FileFinderProduct';
import FileFinderForm from '@app/FileFinderForm';

const FileFinder = ({
  className = '',
  files,
  dirHandle,
}: {
  className?: string;
  files: Array<FileSystemFileHandle>;
  dirHandle: FileSystemDirectoryHandle;
}) => {
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [checkedCategories, setCheckedCategories] =
    React.useState<Array<string>>(productCategories);

  const results = React.useMemo<Array<ProductI>>(
    () =>
      products
        .filter(
          (product) =>
            product.categories.some((item) =>
              checkedCategories.includes(item)
            ) && product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5),
    [searchTerm, checkedCategories]
  );

  return (
    <div className={cn(className, 'file-finder')}>
      <FileFinderForm
        setSearchTerm={setSearchTerm}
        checkedCategories={checkedCategories}
        setCheckedCategories={setCheckedCategories}
      />
      <div className="file-finder__list">
        {results.map((product) => (
          <FileFinderProduct
            className="file-finder__list-item"
            product={product}
            dirHandle={dirHandle}
          />
        ))}
      </div>
    </div>
  );
};

export default FileFinder;
