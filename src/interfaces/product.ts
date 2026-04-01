export interface Product {
  id: number;
  name: string;
  category: string;
  dressStyle: string;
  price: number;
  sale?: number;
  size: string[];
  color: string[];
  image: string;
  images: string[];
  isNewArrivals: boolean;
  isTopSelling: boolean;
  description: string;
}
