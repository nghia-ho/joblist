import React from "react";
import BasicPagination from "./components/BasicPagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./auth/AuthProvider";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import JobModal from "./pages/JobModal";
import LoginModal from "./pages/LoginModal";
import RequireAuth from "./auth/RequireAuth";

function App() {
  let location = useLocation();
  let state = location.state;

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <AuthProvider>
      <ThemeProvider theme={darkTheme}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<Layout />}>
            <Route path="login" element={<LoginModal />} />
            <Route path="jobs/:id" element={<JobModal />} />
          </Route>
        </Routes>

        {state && (
          <Routes>
            <Route path="login" element={<LoginModal />} />

            <Route
              path="jobs/:id"
              element={
                <RequireAuth>
                  <JobModal />
                </RequireAuth>
              }
            />
          </Routes>
        )}
        <BasicPagination />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
