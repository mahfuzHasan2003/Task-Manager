import FinishedTasks from "@/components/my-components/finished-tasks";
import InProgressTasks from "@/components/my-components/in-progress-tasks";
import ToDoTasks from "@/components/my-components/to-do-tasks";
import useAuth from "@/hooks/use-auth";
import { DndContext } from "@dnd-kit/core";

const TaskContainer = () => {
  const { user } = useAuth();
  //   const COLUMNS = [
  //     { id: "todo", title: "To-Do" },
  //     { id: "in-progress", title: "In Progress.." },
  //     { id: "finished", title: "Finished" },
  //   ];
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active?._id;
  };
  return (
    <main className="overflow-hidden flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <h1 className="text-center font-bold text-3xl lg:text-4xl">
        Manage your task in one place
      </h1>
      {user && user?.email ? (
        <div className="lg:flex-1 lg:flex gap-5 overflow-hidden h-full mt-10">
          <DndContext onDragEnd={handleDragEnd}>
            <ToDoTasks />
            <InProgressTasks />
            <FinishedTasks />
          </DndContext>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-10 font-bold">
          Please login to use the app and save your data
        </p>
      )}
    </main>
  );
};

export default TaskContainer;
