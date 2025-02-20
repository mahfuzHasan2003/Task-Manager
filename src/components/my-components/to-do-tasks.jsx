import { ClipboardList } from "lucide-react";
import "@/components/my-components/specific-scroll-color.css";

const ToDoTasks = () => {
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
      <p className="p-5"></p>
    </div>
  );
};

export default ToDoTasks;
