// src/App.js

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./landing_page/LoginPage"; // adjust path as needed
import SignupPage from "./landing_page/SignupPage"; // optional
import DashboardHome from "./dashboard/dashboardHome";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardHome />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
