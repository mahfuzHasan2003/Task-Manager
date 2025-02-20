import { FaHourglassHalf } from "react-icons/fa";
import TaskColumn from "./task-column";

const InProgressTasks = ({ tasks }) => (
  <TaskColumn
    id="in-progress"
    title="In Progress"
    icon={FaHourglassHalf}
    tasks={tasks}
    bgColor="bg-yellow-500/40"
    textColor="bg-yellow-400 text-yellow-800"
  />
);

export default InProgressTasks;
