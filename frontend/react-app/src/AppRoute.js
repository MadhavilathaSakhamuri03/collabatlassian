import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./api/HomePage";
import IssuesTable from "./components/IssuesTable";
import SprintTable from "./components/SprintTable";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/sprint" />} /> 
      <Route path="/dashboard" element={<Dashboard />} /> 
      <Route path="/sprint" element={<SprintTable />} /> 
      <Route path="/issues" element={<IssuesTable selectedView="issues" title="All Issues"/>} /> 
      <Route path="/bugs" element={<IssuesTable selectedView="bugs"  title="Bug Issues"/>} /> 
    </Routes>
  );
};

export default AppRoutes;
