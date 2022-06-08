import { RouteObject } from "react-router-dom";
import { PATHS_ADMIN, PATHS_SYSTEM_MANAGER } from "./constants/paths";
import AdminLoginPage from "./pages/admin/admin_login";
import AdminDashboardPage from "./pages/admin/dashboard";
import SystemManagerInvitationPage from "./pages/admin/invitation";
import RoleSelectionPage from "./pages/role_selection";
import SystemManagerCreateAccountPage from "./pages/system_manager/create_account";
import SystemManagerDashboardPage from "./pages/system_manager/dashboard";
import SystemManagerLoginPage from "./pages/system_manager/login";

export const UNPROTECTED_ROUTES: RouteObject[] = [
  { path: "/", element: <RoleSelectionPage /> },
  { path: PATHS_ADMIN.login, element: <AdminLoginPage /> },
  { path: PATHS_SYSTEM_MANAGER.login, element: <SystemManagerLoginPage /> },
  {
    path: PATHS_SYSTEM_MANAGER.createAccount,
    element: <SystemManagerCreateAccountPage />,
  },
  { path: "*", element: <div>Not Found</div> },
];

export const PROTECTED_ROUTES_ADMIN: RouteObject[] = [
  {
    path: "/admin",
    children: [
      { path: PATHS_ADMIN.login, element: <AdminLoginPage /> },
      { path: PATHS_ADMIN.dashboard, element: <AdminDashboardPage /> },
      {
        path: PATHS_ADMIN.systemManagerInvitation,
        element: <SystemManagerInvitationPage />,
      },
      { path: "*", element: <div>Not Found</div> },
    ],
  },
];

export const PROTECTED_ROUTES_SYSTEM_MANAGER: RouteObject[] = [
  {
    path: "/system-manager",
    children: [
      {
        path: PATHS_SYSTEM_MANAGER.createAccount,
        element: <SystemManagerCreateAccountPage />,
      },
      { path: PATHS_SYSTEM_MANAGER.login, element: <SystemManagerLoginPage /> },
      {
        path: PATHS_SYSTEM_MANAGER.dashboard,
        element: <SystemManagerDashboardPage />,
      },
    ],
  },
];
