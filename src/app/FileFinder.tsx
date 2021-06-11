import React from 'react';

import { products, ProductI } from '@app/database';
import cn from '@utils/classnames';
import FileFinderProduct from '@app/FileFinderProduct';

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

  const results = React.useMemo<Array<ProductI>>(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [searchTerm]
  );

  return (
    <div className={cn(className, 'file-finder')}>
      <input
        onKeyUp={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
        name="searchTerm"
        id="searchTerm"
        type="text"
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
