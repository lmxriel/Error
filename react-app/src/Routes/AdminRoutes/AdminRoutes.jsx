import AdminLoginPage from "../../Pages/AdminLoginPage/AdminLoginPage";
import AddAccountPage from "../../Pages/Add Account/AddAccountPage";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import RecordPage from "../../Pages/Records/RecordsPages";
import UpdateAccountPage from "../../Pages/Update Account/UpdateAccountPage";
import AddSubjectPage from "../../Pages/Add Subject/AddSubjectPage";

const AdminLoginRoute = {
  path: "/",
  element: <AdminLoginPage />,
};

const AddAccountRoute = {
  path: "/add-account",
  element: <AddAccountPage />,
};

const AddSubjectRoute = {
  path: "/add-subjects",
  element: <AddSubjectPage />,
};

const DashboardRoute = {
  path: "/dashboard",
  element: <DashboardPage />,
};

const RecordRoute = {
  path: "/account-record",
  element: <RecordPage />,
};

const UpdateAccountRoute = {
  path: "/update-account",
  element: <UpdateAccountPage />,
};

export {
  AdminLoginRoute,
  AddAccountRoute,
  AddSubjectRoute,
  DashboardRoute,
  RecordRoute,
  UpdateAccountRoute,
};
