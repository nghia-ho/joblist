import React from "react";
import HomePage from "./Homepage";
import MyAppBar from "../components/MyAppBar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <MyAppBar />
      <HomePage />
      <Outlet />
    </>
  );
}

export default Layout;
