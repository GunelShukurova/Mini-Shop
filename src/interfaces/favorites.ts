import type { Product } from "./product";

export interface FavoritesContextType {
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
  totalFavorites: number;
}
