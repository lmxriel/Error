import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  DashboardRoute,
  LoginRoute,
  PetRoute,
  AdoptionRequestRoute,
  AppointmentPageRoute,
  MessagesPageRoute,
  ConversationPageRoute,
} from "./Routes/AdminRoutes/AdminRoutes";
import {
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
  UserBookingFormRoute,
} from "./Routes/UserRoutes/UserRoutes";
const routers = createBrowserRouter([
  LoginRoute,
  PetRoute,
  DashboardRoute,
  AdoptionRequestRoute,
  AppointmentPageRoute,
  MessagesPageRoute,
  ConversationPageRoute,
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
  UserBookingFormRoute,
]);

function App() {
  return <RouterProvider router={routers} />;
}
export default App;