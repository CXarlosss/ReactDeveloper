
// Layouts
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ProfileLayout from '@/layouts/ProfileLayout';

// Vistas principales
import DashboardView from '@/views/DashboardView';
import CreateProjectView from '@/views/projects/CreateProjectView';
import EditProjectView from '@/views/projects/EditProjectView';
import ProjectDetailsView from '@/views/projects/ProjectDetailsView';
import ProjectTeamView from '@/views/projects/ProjectTeamView';

// Auth
import LoginView from '@/views/auth/LoginView';
import RegisterView from '@/views/auth/RegisterView';
import ConfirmAccountView from '@/views/auth/ConfirmAccountView';
import RequestNewCodeView from '@/views/auth/RequestNewCodeView';
import ForgotPasswordView from '@/views/auth/ForgotPasswordView';
import NewPasswordView from '@/views/auth/NewPasswordView';

// Perfil
import ProfileView from '@/views/profile/ProfileView';
import ChangePasswordView from '@/views/profile/ChangePasswordView';

// Modales / Tasks
import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import DropTaskModal from '@/components/tasks/DropTaskModal';

// Otros
import NotFound from '@/views/404/NotFound';

export default function ComponentDebuggerPage() {
  console.group("🧪 Renderizando ComponentDebuggerPage");

  return (
    <div className="space-y-10 p-10">
      <h1 className="text-4xl font-bold text-center text-green-600">🧩 Debug Global de Componentes</h1>

      <section>
        <h2 className="text-2xl font-semibold text-green-500">Layouts</h2>
        <AppLayout />
        <AuthLayout />
        <ProfileLayout />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-500">Vistas - Proyectos</h2>
        <DashboardView />
        <CreateProjectView />
        <EditProjectView />
        <ProjectDetailsView />
        <ProjectTeamView />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-500">Vistas - Auth</h2>
        <LoginView />
        <RegisterView />
        <ConfirmAccountView />
        <RequestNewCodeView />
        <ForgotPasswordView />
        <NewPasswordView />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-500">Perfil</h2>
        <ProfileView />
        <ChangePasswordView />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-500">Tareas / Modales</h2>
        <AddTaskModal />
        <EditTaskData />
        <TaskModalDetails />
        <DropTaskModal status="pending" />
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-green-500">404</h2>
        <NotFound />
      </section>
    </div>
  );
}
