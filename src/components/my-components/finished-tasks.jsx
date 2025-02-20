import { LucideCheckCheck } from "lucide-react";
import "@/components/my-components/specific-scroll-color.css";
import SingleTask from "./single-task";
import useGetTasks from "@/hooks/use-get-tasks";
import { useDroppable } from "@dnd-kit/core";

const FinishedTasks = ({ tasks }) => {
  // const { data = {}, isLoading } = useGetTasks(["finishedTasks"], "finished");
  // const { success, userTasks = [] } = data;

  const { setNodeRef } = useDroppable({
    id: "finished",
  });
  return (
    <div
      className="lg:flex-1 bg-green-500/10 rounded-md overflow-y-auto"
      id="finished"
    >
      <h4 className="sticky top-0 bg-green-500 text-green-800 py-5 px-2 text-xl font-bold">
        <span className="inline-flex gap-2 items-center">
          <LucideCheckCheck /> Finished
        </span>
      </h4>
      <div className="p-5 space-y-3" ref={setNodeRef}>
        {tasks.map((task) => (
          <SingleTask key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default FinishedTasks;
