// src/components/debug/TaskComponentsDebugger.tsx
import AddTaskModal from '@/components/tasks/AddTaskModal';
import EditTaskData from '@/components/tasks/EditTaskData';
import TaskModalDetails from '@/components/tasks/TaskModalDetails';
import DropTaskModal from '@/components/tasks/DropTaskModal';

export default function TaskComponentsDebugger() {
  console.group("🧪 Cargando TaskComponentsDebugger");

  try {
    console.log("🔍 Probando AddTaskModal");
    const AddTask = <AddTaskModal />;

    console.log("🔍 Probando EditTaskData");
    const EditTask = <EditTaskData />;

    console.log("🔍 Probando TaskModalDetails");
    const TaskDetails = <TaskModalDetails />;

    console.log("🔍 Probando DropTaskModal (Status: 'pending')");
    const DropTask = <DropTaskModal status="pending" />;

    console.groupEnd();

    return (
      <>
        {AddTask}
        {EditTask}

        {TaskDetails}
        {DropTask}
      </>
    );
  } catch (err) {
    console.error("❌ Error al renderizar componentes de tareas:", err);
    console.groupEnd();
    return <p className="text-red-500 font-bold text-center">⚠ Error al cargar componentes de tareas</p>;
  }
}
