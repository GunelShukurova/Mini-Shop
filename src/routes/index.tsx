import Layout from "../layout/Layout";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import ProductDetail from "../pages/ProductDetail";

const ROUTES = [
  {
    element: <Layout />,
    path: "/",
    children: [
      {
        index: true,
        element: <Home />,
      },
         {
        element: <ProductDetail />,
        path: "product/:id"
      },
         {
        element: <Category />,
        path: "category"
      },
      {
        element: <Cart />,
        path: "cart"
      },
      {
        element: <Favorites />,
        path: "favorites"
      },
    ],
  },
];

export default ROUTES;
