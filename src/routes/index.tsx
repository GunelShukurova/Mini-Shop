import Layout from "../layout/Layout";
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
        path: ":id"
      },
    ],
  },
];

export default ROUTES;
