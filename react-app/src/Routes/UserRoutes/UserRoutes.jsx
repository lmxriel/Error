import UserLoginPage from "../../Pages-User/UserLogin/UserLogin";
import UserDashboardPage from "../../Pages-User/UserDashboard/UserDashboardPage";
import AdoptionPage from "../../Pages-User/UserDashboard/AdoptionPage";
import UserRegistrationPage from "../../Pages-User/UserLogin/UserRegistration";
import BookingPage from "../../Pages-User/UserDashboard/BookingPage";

const UserDashboardRoute = {
  path: "/",
  element: <UserDashboardPage />,
};
const UserLoginRoute = {
  path: "/user/login",
  element: <UserLoginPage />,
};
const UserRegistrationRoute = {
  path: "/register",
  element: <UserRegistrationPage />,
}
const UserAdoptionRoute = {
  path: "/adoption",
  element: <AdoptionPage/>,
}

const UserBookingRoute = {
  path: "/booking",
  element: <BookingPage />,
}
export {
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
}