import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import Main from "./pages/Main";
import Register from "./pages/Register";
import Login from "./pages/Login";

export const App = () => {
  const { state } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute
              redirectTo="/login"
              authenticated={Boolean(state.authToken)}
            >
              <Main />
            </PrivateRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PrivateRoute
              redirectTo="/"
              authenticated={!Boolean(state.authToken)}
            >
              <Register />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PrivateRoute
              redirectTo="/"
              authenticated={!Boolean(state.authToken)}
            >
              <Login />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};
