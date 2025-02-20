import { useState, useEffect } from "react";
import FinishedTasks from "@/components/my-components/finished-tasks";
import InProgressTasks from "@/components/my-components/in-progress-tasks";
import ToDoTasks from "@/components/my-components/to-do-tasks";
import useAuth from "@/hooks/use-auth";
import socket from "@/socket";
import { DndContext, DragOverlay, closestCorners } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import AddTaskModal from "./add-task-modal";
import SingleTask from "./single-task";

const TaskContainer = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState({
    todo: [],
    "in-progress": [],
    finished: [],
  });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  useEffect(() => {
    if (user?.email) {
      socket.emit("getTasks", user.email);
      socket.on("tasksUpdated", setTasks);

      return () => {
        socket.off("tasksUpdated");
      };
    }
  }, [user]);

  const findTaskContainer = (id) => {
    if (tasks.todo.find((task) => task._id === id)) return "todo";
    if (tasks["in-progress"].find((task) => task._id === id))
      return "in-progress";
    if (tasks.finished.find((task) => task._id === id)) return "finished";
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    const activeStatus = findTaskContainer(active.id);
    setActiveTask(tasks[activeStatus].find((task) => task._id === active.id));
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    const activeStatus = findTaskContainer(activeId);
    const overStatus = findTaskContainer(overId) || over.id;

    if (activeStatus !== overStatus) {
      setTasks((prev) => {
        const activeItems = prev[activeStatus];
        const overItems = prev[overStatus] || [];

        const activeIndex = activeItems.findIndex(
          (item) => item._id === activeId
        );
        const overIndex = overItems.findIndex((item) => item._id === overId);

        return {
          ...prev,
          [activeStatus]: [
            ...prev[activeStatus].filter((item) => item._id !== activeId),
          ],
          [overStatus]: [
            ...overItems.slice(
              0,
              overIndex === -1 ? overItems.length : overIndex
            ),
            { ...activeItems[activeIndex], status: overStatus },
            ...overItems.slice(overIndex === -1 ? overItems.length : overIndex),
          ],
        };
      });
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    // DEBUG: issue here!!
    //  const activeStatus = findTaskContainer(activeId);
    const activeStatus = activeTask.status;
    const overStatus = findTaskContainer(overId) || over.id;
    console.log(activeStatus);

    if (activeStatus !== overStatus) {
      socket.emit("updateTaskStatus", {
        taskId: activeId,
        newStatus: overStatus,
        email: user.email,
      });
    } else {
      const oldIndex = tasks[activeStatus].findIndex(
        (task) => task._id === activeId
      );
      const newIndex = tasks[activeStatus].findIndex(
        (task) => task._id === overId
      );

      if (oldIndex !== newIndex) {
        const newTasks = {
          ...tasks,
          [activeStatus]: arrayMove(tasks[activeStatus], oldIndex, newIndex),
        };

        setTasks(newTasks);
        socket.emit("reorderTasks", {
          tasks: newTasks[activeStatus],
          email: user.email,
        });
      }
    }

    setActiveTask(null);
  };

  const handleAddTask = (newTask) => {
    socket.emit("addTask", { ...newTask, email: user.email });
    setIsAddModalOpen(false);
  };

  return (
    <main className="overflow-hidden flex-1 p-3 mb-2 rounded-md h-full lg:flex flex-col">
      <div className="flex justify-between items-center mb-5">
        <h1 className="font-bold text-3xl lg:text-4xl">Manage your tasks</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Task
        </Button>
      </div>
      {user?.email ? (
        <div className="lg:flex-1 lg:flex gap-5 overflow-hidden h-full mt-10">
          <DndContext
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
          >
            <ToDoTasks tasks={tasks.todo} />
            <InProgressTasks tasks={tasks["in-progress"]} />
            <FinishedTasks tasks={tasks.finished} />
            <DragOverlay>
              {activeTask ? <SingleTask task={activeTask} isDragging /> : null}
            </DragOverlay>
          </DndContext>
        </div>
      ) : (
        <p className="text-red-500 text-center mt-10 font-bold">
          Please login to use the app and save your data
        </p>
      )}
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTask={handleAddTask}
      />
    </main>
  );
};

export default TaskContainer;
