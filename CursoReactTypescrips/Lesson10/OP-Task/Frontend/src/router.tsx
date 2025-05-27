import { Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import DashboardView from "./views/DashboardView";
import ProjectsListView from "./views/projects/ProjectsListView"; // si existe
import CreateProjectView from "./views/projects/CreateProjectView"; // si existe

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/projects/create" element={<CreateProjectView />} />
        <Route path="/projects" element={<ProjectsListView />} />
      </Route>
    </Routes>
  );
}
