import LoginPage from "../../Pages/Login/Login";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import RecordPage from "../../Pages/Records/RecordsPages";
import PetPage from "../../Pages/Dashboard/PetPage";

const LoginRoute = {
  path: "/admin/login",
  element: <LoginPage />,
};

const DashboardRoute = {
  path: "/dashboard",
  element: <DashboardPage />,
};

const RecordRoute = {
  path: "/account-record",
  element: <RecordPage />,
};

const PetRoute = {
  path: "/pets",
  element: <PetPage />,
};

export { LoginRoute, DashboardRoute, RecordRoute, PetRoute,};
