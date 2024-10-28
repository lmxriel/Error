import UserLoginPage from "../../Pages-User/UserLogin/UserLogin";
import UserDashboardPage from "../../Pages-User/UserDashboard/UserDashboardPage";
import UserReportPage from "../../Pages-User/UserReports/UserReportPages";
import UserProfilePage from "../../Pages-User/UserProfile/UserProfilePage";
import UserChangepasswordPage from "../../Pages-User/UserChangepassword/ChangepasswordPage";

const UserLoginRoute = {
  path: "/user/login",
  element: <UserLoginPage />,
};

const UserDashboardRoute = {
  path: "/user/dashboard",
  element: <UserDashboardPage />,
};

const UserProfileRoute = {
  path: "/user/profile",
  element: <UserProfilePage />,
};

const UserReportRoute = {
  path: "/user/report",
  element: <UserReportPage />,
};

const UserChangepasswordRoute = {
  path: "/user/change-password",
  element: <UserChangepasswordPage />,
};

export {
  UserLoginRoute,
  UserDashboardRoute,
  UserReportRoute,
  UserProfileRoute,
  UserChangepasswordRoute,
};
