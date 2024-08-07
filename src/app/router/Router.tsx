import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { authRoutes, publicRoutes } from "./routes";
import { useAppSelector } from "@shared/hooks";
const AppRouter: React.FC = () => {
  const token = useAppSelector((state) => state.user.token) || true; //временный доступ

  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {token &&
            authRoutes.map(({ path, Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          {publicRoutes.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
