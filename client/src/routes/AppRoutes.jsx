import { useContext, useEffect } from "react";
import { useApi } from "../shared/useApi";
import { AuthContext } from "../state/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import AuthLayout from "../layout/AuthLayout";
import DashBoardLayout from "../layout/DashBoardLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import AddProductPage from "../pages/AddProductPage";

const AppRoutes = () => {
  const api = useApi();
  console.log(api);

  const { user, setUser, setIsLoading, setAccessToken } =
    useContext(AuthContext);
  console.log("User :", user);

  useEffect(() => {
    const refreshUser = async () => {
      try {
        const res = await api.post("/auth/refresh");
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    refreshUser();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <PublicRoutes />,
      children: [
        {
          path: "",
          element: <AuthLayout />,
          children: [
            {
              path: "",
              element: <RegisterPage />,
            },
            {
              path: "/login",
              element: <LoginPage />,
            },
          ],
        },
      ],
    },
    {
      path: "/home",
      element: <ProtectedRoutes />,
      children: [
        {
          path: "",
          element: <DashBoardLayout />,
          children: [
            {
              path: "",
              element: <HomePage />,
            },
            {
              path: "products",
              element: <ProductsPage />,
            },
            {
              path: "products/:id",
              element: <ProductDetailPage />,
            },
            {
              path: "create-product",
              element: <AddProductPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
