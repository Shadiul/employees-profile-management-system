import React from "react";
import { useRoutes } from "react-router-dom";
import { useAuth } from "./contexts/AuthContextProvider";
import {
  PROTECTED_ROUTES_ADMIN,
  PROTECTED_ROUTES_SYSTEM_MANAGER,
  UNPROTECTED_ROUTES,
} from "./routes";

function App() {
  const auth = useAuth();

  let routes;

  if (auth.isLoggedIn) {
    switch (auth.role) {
      case "admin":
        routes = PROTECTED_ROUTES_ADMIN;
        break;
      case "system_manager":
        routes = PROTECTED_ROUTES_SYSTEM_MANAGER;
        break;
      default:
        routes = UNPROTECTED_ROUTES;
        break;
    }
  } else {
    routes = UNPROTECTED_ROUTES;
  }

  const renderRoutes = useRoutes(routes);
  return <>{renderRoutes}</>;
}

export default App;
