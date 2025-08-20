import UserLoginPage from "../../Pages-User/UserLogin/UserLogin";
import UserDashboardPage from "../../Pages-User/UserDashboard/UserDashboardPage";
import AdoptionPage from "../../Pages-User/UserDashboard/AdoptionPage";
import DogPage from "../../Pages-User/UserDashboard/DogPage";
import CatPage from "../../Pages-User/UserDashboard/CatPage";
import AllPetPage from "../../Pages-User/UserDashboard/AllPetPage";
import UserRegistrationPage from "../../Pages-User/UserLogin/UserRegistration";
import BookingPage from "../../Pages-User/UserDashboard/BookingPage";
import BookingFormPage from "../../Pages-User/UserDashboard/BookingForm";
import AdoptionFormPage from "../../Pages-User/UserDashboard/AdoptionForm";

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
const UserDogPageRoute = {
    path: "/dogs",
  element: <DogPage />,
}
const UserCatPageRoute = {
    path: "/cats",
  element: <CatPage />,
}
const UserAllPetPageRoute = {
    path: "/all",
  element: <AllPetPage />,
}
const UserBookingRoute = {
  path: "/booking",
  element: <BookingPage />,
}
const UserBookingFormRoute = {
  path: "/booking-form",
  element: <BookingFormPage />,
}
const UserAdoptionFormRoute = {
  path: "/adoption-form",
  element: <AdoptionFormPage />,
}

export {
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
}