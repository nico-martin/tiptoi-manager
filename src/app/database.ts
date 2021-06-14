import { products as productsDB } from '../../db.json';

export interface AudioFileI {
  fileName: string;
  id: string;
  modifiedAt: string;
  url: string;
  version: string;
}

export interface ProductImageI {
  dimension: string;
  fileName: string;
  modifiedAt: string;
  tags: Array<string>;
  url: string;
}

export interface ProductI {
  id: string;
  name: string;
  categories: Array<string>;
  ageFrom?: number;
  ageTo?: number;
  shortDescription?: string;
  description?: string;
  images: Array<ProductImageI>;
  shopUrl: string;
  gameFiles: Array<AudioFileI>;
  releaseDate: string;
}

export const products: Array<ProductI> = productsDB;

export const productCategories: Array<string> = products
  .reduce((acc, product) => [...acc, ...product.categories], [])
  .reduce(
    (acc, product) => (acc.includes(product) ? acc : [...acc, product]),
    []
  );

export const gmeFilesIndices: Record<string, number> = products.reduce(
  (acc, product, index) => ({
    ...acc,
    ...product.gameFiles.reduce(
      (acc, file) => ({ ...acc, [file.url.split('/').pop()]: index }),
      {}
    ),
  }),
  {}
);
