import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardRoute,
  LoginRoute,
  RecordRoute,
} from "./Routes/AdminRoutes/AdminRoutes";
import {
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
} from "./Routes/UserRoutes/UserRoutes";
const routers = createBrowserRouter([
  LoginRoute,
  DashboardRoute,
  RecordRoute,
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
]);

function App() {
  return <RouterProvider router={routers} />;
}

export default App;