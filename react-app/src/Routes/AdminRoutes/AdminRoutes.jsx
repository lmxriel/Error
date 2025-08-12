import LoginPage from "../../Pages/Login/Login";
import DashboardPage from "../../Pages/Dashboard/DashboardPage";
import PetPage from "../../Pages/Dashboard/PetPage";
import AdoptionRequestPage from "../../Pages/Dashboard/AdoptionRequest";
import AppointmentPage from "../../Pages/Dashboard/AppointmentPage";
import MessagesPage from "../../Pages/Dashboard/MessagesPage";
import ConversationPage from "../../Pages/Dashboard/ConversationPage";

const LoginRoute = {
  path: "/admin/login",
  element: <LoginPage />,
};

const DashboardRoute = {
  path: "/dashboard",
  element: <DashboardPage />,
};

const PetRoute = {
  path: "/pets",
  element: <PetPage />,
};

const AdoptionRequestRoute = {
  path: "/adoptions/pending",
  element: <AdoptionRequestPage />,
};

const AppointmentPageRoute = {
  path: "/appointments",
  element: <AppointmentPage />,
};

const MessagesPageRoute = {
  path: "/messages",
  element: <MessagesPage />,
};

const ConversationPageRoute = {
  path: "/conversation",
  element: <ConversationPage />,
};

export { LoginRoute, DashboardRoute, PetRoute, AdoptionRequestRoute, AppointmentPageRoute, MessagesPageRoute, ConversationPageRoute};
