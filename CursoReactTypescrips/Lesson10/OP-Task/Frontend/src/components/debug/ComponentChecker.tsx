
// Importa todos los componentes que quieras verificar
import DropTaskModal from "@/components/tasks/DropTaskModal";
import EditTaskData from "@/components/tasks/EditTaskData";
import TaskModalDetails from "@/components/tasks/TaskModalDetails";

export default function ComponentChecker() {
  console.group("🧪 Verificando componentes en ComponentChecker");
  console.log("✔ DropTaskModal:", DropTaskModal);
  console.log("✔ EditTaskData:", EditTaskData);
  console.log("✔ TaskModalDetails:", TaskModalDetails);
  console.groupEnd();

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400">
      <p className="text-yellow-700 font-bold mb-2">Render de prueba:</p>

      {DropTaskModal ? <DropTaskModal status={""} /> : <p>⛔ DropTaskModal undefined</p>}
      {EditTaskData ? <EditTaskData /> : <p>⛔ EditTaskData undefined</p>}
      {TaskModalDetails ? <TaskModalDetails /> : <p>⛔ TaskModalDetails undefined</p>}
    </div>
  );
}
