import { ClipboardList } from "lucide-react";
import "@/components/my-components/specific-scroll-color.css";
import useGetTasks from "@/hooks/use-get-tasks";
import SingleTask from "./single-task";
import { useDroppable } from "@dnd-kit/core";

const ToDoTasks = ({ tasks }) => {
  // const { data = {}, isLoading } = useGetTasks(["todoTasks"], "todo");
  // const { success, userTasks = [] } = data;

  const { setNodeRef } = useDroppable({
    id: "todo",
  });

  return (
    <div
      className="lg:flex-1 bg-blue-500/10 rounded-md overflow-y-auto"
      id="to-do"
    >
      <h4 className="sticky top-0 bg-blue-400 text-blue-800 py-5 px-2 text-xl font-bold">
        <span className="inline-flex gap-2 items-center">
          <ClipboardList /> To-Do
        </span>
      </h4>

      <div className="p-5 space-y-3" ref={setNodeRef}>
        {tasks?.map((task) => (
          <SingleTask key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default ToDoTasks;
