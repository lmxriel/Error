import LoginPage from "../../Pages/Login/Login";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import RecordPage from "../../Pages/Records/RecordsPages";
import PetPage from "../../Pages/Dashboard/PetPage";
import ChangePassword from "../../Pages/Dashboard/ChangePassword";

const LoginRoute = {
  path: "/admin",
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
const ChangePasswordRoute = {
  path: "/change-password", 
  element: <ChangePassword/>,
}

export { LoginRoute, DashboardRoute, RecordRoute, PetRoute, ChangePasswordRoute};
