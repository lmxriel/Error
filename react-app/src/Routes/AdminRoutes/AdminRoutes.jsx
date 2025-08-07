import LoginPage from "../../Pages/Login/Login";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import PetPage from "../../Pages/Dashboard/PetPage";

const LoginRoute = {
  path: "/admin/login",
  element: <LoginPage />,
};

const DashboardRoute = {
  path: "/dashboard",
  element: <DashboardPage />,
};

const PetRoute = {
  path: "/pets",
  element: <PetPage />,
};

export { LoginRoute, DashboardRoute, PetRoute,};
