import { Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import routes from "./routesConfig";
import PrivateRoute from "./PrivateRoute";

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {routes.map(({ path, component: Component, isPrivate, ...rest }) =>
        isPrivate ? (
          <Route
            key={path}
            path={path}
            element={
              <PrivateRoute auth={{ isAuthenticated: isAuthenticated }}>
                <Component />
              </PrivateRoute>
            }
          />
        ) : (
          <Route key={path} path={path} element={<Component />} {...rest} />
        )
      )}
    </Routes>
  );
}

export default AppRoutes;
