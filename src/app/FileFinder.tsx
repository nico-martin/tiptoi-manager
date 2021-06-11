import React from 'react';

import { products, ProductI } from '@app/database';
import cn from '@utils/classNames';

const FileFinder = ({ className = '' }: { className?: string }) => {
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
      <ul className="file-finder__list">
        {results.map((product) => (
          <li>
            {product.images.length !== 0 && <img src={product.images[0].url} />}
            <p>{product.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileFinder;
