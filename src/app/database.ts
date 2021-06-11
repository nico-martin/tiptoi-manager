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
