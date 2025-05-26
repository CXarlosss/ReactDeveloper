import { Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
