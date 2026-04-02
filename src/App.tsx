import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes";
import { CartProvider } from "./context/CartContext/cartProvider";
import { FavoritesProvider } from "./context/FavoritesContext/favoritesProvider";
import { SearchProvider } from "./context/SearchContext/searchProvider";

function App() {
  const routes = createBrowserRouter(ROUTES);
  return (
    <>
      <SearchProvider>
        <CartProvider>
          <FavoritesProvider>
            <RouterProvider router={routes} />
          </FavoritesProvider>
        </CartProvider>
      </SearchProvider>
    </>
  );
}

export default App;
