import { LucideCheckCheck } from "lucide-react";
import TaskColumn from "./task-column";

const FinishedTasks = ({ tasks }) => (
  <TaskColumn
    id="finished"
    title="Finished"
    icon={LucideCheckCheck}
    tasks={tasks}
    bgColor="bg-green-500/10"
    textColor="bg-green-500 text-green-800"
  />
);

export default FinishedTasks;
