import UserLoginPage from "../../Pages-User/UserLogin/UserLogin";
import UserDashboardPage from "../../Pages-User/UserDashboard/UserDashboardPage";
import AdoptionPage from "../../Pages-User/UserDashboard/AdoptionPage";
import UserRegistrationPage from "../../Pages-User/UserLogin/UserRegistration";
import BookingPage from "../../Pages-User/UserDashboard/BookingPage";
import BookingFormPage from "../../Pages-User/UserDashboard/BookingForm";

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
const UserBookingFormRoute = {
  path: "/booking-form",
  element: <BookingFormPage />,
}
export {
  UserLoginRoute,
  UserDashboardRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
  UserBookingRoute,
  UserBookingFormRoute,
}