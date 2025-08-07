import UserLoginPage from "../../Pages-User/UserLogin/UserLogin";
import UserDashboardPage from "../../Pages-User/UserDashboard/UserDashboardPage";
import UserReportPage from "../../Pages-User/UserReports/UserReportPages";
import UserProfilePage from "../../Pages-User/UserProfile/UserProfilePage";
import AdoptionPage from "../../Pages-User/UserDashboard/AdoptionPage";
import UserRegistrationPage from "../../Pages-User/UserLogin/UserRegistration";

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
const UserProfileRoute = {
  path: "/user/profile",
  element: <UserProfilePage />,
};

const UserReportRoute = {
  path: "/user/report",
  element: <UserReportPage />,
};


export {
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserAdoptionRoute,
  UserRegistrationRoute,
}