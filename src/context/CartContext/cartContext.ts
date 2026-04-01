import { useContext } from "react";
import CartContext from "./cartProvider"

const useBasket = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useBasket must be used within CartProvider");
  }
  return context;
};

export default useBasket;