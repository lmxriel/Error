import UserLoginPage from "../../Pages-User/UserLogin/UserLogin";
import UserDashboardPage from "../../Pages-User/UserDashboard/UserDashboardPage";
import UserReportPage from "../../Pages-User/UserReports/UserReportPages";
import UserProfilePage from "../../Pages-User/UserProfile/UserProfilePage";
import UserChangepasswordPage from "../../Pages-User/UserChangepassword/ChangepasswordPage";
import AdoptionPage from "../../Pages-User/UserDashboard/AdoptionPage";


const UserLoginRoute = {
  path: "/",
  element: <UserLoginPage />,
};

const UserAdoptionRoute = {
  path: "/adoption",
  element: <AdoptionPage/>,
}

const UserDashboardRoute = {
  path: "/about",
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
  UserAdoptionRoute,

}