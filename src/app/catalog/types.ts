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

export interface Product {
  id: string;
  name: string;
  categories: Array<string>;
  ageFrom: number;
  ageTo: number;
  series: string;
  description: string;
  images: Array<{
    tags: Array<string>;
    url: string;
    modifiedAt: string;
    fileName: string;
    dimension: string;
  }>;
  shopUrl: string;
  gameFiles: Array<{
    id: string;
    url: string;
    version: string;
    modifiedAt: string;
    fileName: string;
  }>;
  releaseDate: string;
  relatedProduct: string;
}

export interface Audio {
  id: string;
  name: string;
  categories: Array<string>;
  ageFrom: number;
  price: string;
  description: string;
  images: Array<{
    tags: Array<string>;
    url: string;
    modifiedAt: string;
    fileName: string;
    dimension: string;
  }>;
  shopUrl: string;
  audioFile: {
    url: string;
    sampleUrl: string;
    modifiedAt: string;
    fileName: string;
  };
  releaseDate: string;
}

export interface Catalog {
  modifiedAt: string;
  products: Array<Product>;
  audios: Array<Audio>;
  bestsellers: Array<Object>;
  recommended: Array<string>;
  marketingTiles: Array<{
    text: string;
    image: string;
    type: string;
    target: string;
  }>;
}
