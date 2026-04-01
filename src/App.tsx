import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes";
import { CartProvider } from "./context/CartContext/cartProvider";
import { FavoritesProvider } from "./context/FavoritesContext/favoritesProvider";

function App() {
  const routes = createBrowserRouter(ROUTES);
  return (
    <>
      <CartProvider>
        <FavoritesProvider>
          <RouterProvider router={routes} />
        </FavoritesProvider>
      </CartProvider>
    </>
  );
}

export default App;
