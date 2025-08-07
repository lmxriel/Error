import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardRoute,
  LoginRoute,
  PetRoute,
} from "./Routes/AdminRoutes/AdminRoutes";
import {
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
} from "./Routes/UserRoutes/UserRoutes";
const routers = createBrowserRouter([
  LoginRoute,
  PetRoute,
  DashboardRoute,
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
]);

function App() {
  return <RouterProvider router={routers} />;
}
export default App;