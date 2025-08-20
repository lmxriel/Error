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
  UserDogPageRoute,
  UserCatPageRoute,
  UserAllPetPageRoute,
  UserRegistrationRoute,
  UserBookingRoute,
  UserBookingFormRoute,
  UserAdoptionFormRoute,
} from "./Routes/UserRoutes/UserRoutes";
const routers = createBrowserRouter([
  LoginRoute,
  PetRoute,
  DashboardRoute,
  AdoptionRequestRoute,
  UserDogPageRoute,
  UserCatPageRoute,
  UserAllPetPageRoute,
  AppointmentPageRoute,
  MessagesPageRoute,
  ConversationPageRoute,
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
  UserBookingFormRoute,
  UserAdoptionFormRoute,
]);

function App() {
  return <RouterProvider router={routers} />;
}
export default App;