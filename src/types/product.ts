export interface Product {
  type: string;
  ram: string;
  img: string;
  price: string;
  url: string;
  vanilla?: string;
  plugins?: string;
  pluginsRange?: string;
  mods?: string;
  modsRange?: string;
  both?: string;
  bothRange?: string;
  infoProxy?: string;
}

export interface Feature {
  icon: string;
  text: string;
}

export interface ProductTier {
  name: string;
  slug: string;
  products: Product[];
  features: Feature[];
  processor: string;
}

export type ProductTierType = 'budget' | 'normal' | 'premium';
