import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ROUTES from "./routes";

function App() {
  const routes = createBrowserRouter(ROUTES);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
