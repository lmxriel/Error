import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardRoute,
  LoginRoute,
  RecordRoute,
  ChangePasswordRoute,
} from "./Routes/AdminRoutes/AdminRoutes";
import {
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserChangepasswordRoute,
} from "./Routes/UserRoutes/UserRoutes";
const routers = createBrowserRouter([
  LoginRoute,
  DashboardRoute,
  RecordRoute,
  ChangePasswordRoute,
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserChangepasswordRoute,
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;
