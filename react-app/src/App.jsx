import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AdminLoginRoute,
  AddAccountRoute,
  AddSubjectRoute,
  DashboardRoute,
  RecordRoute,
  UpdateAccountRoute,
} from "./Routes/AdminRoutes/AdminRoutes";
import {
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserChangepasswordRoute,
} from "./Routes/UserRoutes/UserRoutes";
const routers = createBrowserRouter([
  AdminLoginRoute,
  DashboardRoute,
  AddAccountRoute,
  AddSubjectRoute,
  UpdateAccountRoute,
  RecordRoute,
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
