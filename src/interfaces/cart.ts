export interface CartItem {
  id: number;
  name: string;
  price: number;
  sale?: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}
export interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
