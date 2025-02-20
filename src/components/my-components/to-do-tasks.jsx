import { ClipboardList } from "lucide-react";
import TaskColumn from "./task-column";

const ToDoTasks = ({ tasks }) => (
  <TaskColumn
    id="todo"
    title="To-Do"
    icon={ClipboardList}
    tasks={tasks}
    bgColor="bg-blue-500/10"
    textColor="bg-blue-400 text-blue-800"
  />
);

export default ToDoTasks;
