import { createBrowserRouter } from "react-router-dom";
import { PageLoader } from "../components";
import Home from "../pages/Home";
import Login from "../pages/login";
import Root from "../pages/Root";
import Signup from "../pages/signup";
import AuthRoute from "./authRoutes";
import PrivateRoute from "./privateRoutes";
import About from "../pages/About";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        element: <PrivateRoute />,
        loader: () => <PageLoader />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "/about",
            element: <About />,
          },
        ],
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: "/signup",
            element: <Signup />,
          },
          {
            path: "/login",
            element: <Login />,
          },
        ],
      },
    ],
  },
]);

export default Routes;
