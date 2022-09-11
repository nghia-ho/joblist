// import { BASE_URL } from "./app/config";
// import Form from "./Form";
import React from "react";
import BasicPagination from "./components/BasicPagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { AuthProvider } from "./auth/AuthProvider";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./pages/Layout";
import JobModal from "./pages/JobModal";
import AuthRequire from "./auth/RequireAuth";
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
        <Routes>
          <Route path="/" element={<Layout />}></Route>

          <Route path="/jobs/:id" element={<JobModal />} />
        </Routes>

        <BasicPagination />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
