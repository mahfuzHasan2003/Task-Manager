import FinishedTasks from "@/components/my-components/finished-tasks";
import InProgressTasks from "@/components/my-components/in-progress-tasks";
import ToDoTasks from "@/components/my-components/to-do-tasks";

const TaskContainer = () => {
  return (
    <main className="overflow-hidden flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <h1 className="text-center font-bold text-3xl lg:text-4xl">
        Manage your task in one place
      </h1>
      <div className="lg:flex-1 mt-10 lg:flex gap-5 overflow-hidden h-full">
        <ToDoTasks />
        <InProgressTasks />
        <FinishedTasks />
      </div>
    </main>
  );
};

export default TaskContainer;
