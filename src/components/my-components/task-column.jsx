import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SingleTask from "./single-task";
import "@/components/my-components/specific-scroll-color.css";
import { useState } from "react";

const TaskColumn = ({ id, title, icon: Icon, tasks, bgColor, textColor }) => {
  const { setNodeRef } = useDroppable({ id });
  const [editingTaskId, setEditingTaskId] = useState(null);

  return (
    <div
      className={`lg:flex-1 ${bgColor} rounded-md flex flex-col overflow-hidden`}
    >
      <h4
        className={`sticky top-0 z-10 ${textColor} py-5 px-2 text-xl font-bold flex justify-between`}
      >
        <span className="inline-flex gap-2 items-center">
          <Icon /> {title}
        </span>
        ({tasks.length})
      </h4>
      <div
        className="flex-1 overflow-y-auto p-5 space-y-3"
        ref={setNodeRef}
        id={id}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SingleTask
              key={task._id}
              task={task}
              isEditing={editingTaskId === task._id}
              setEditingTaskId={setEditingTaskId}
              editingTaskId={editingTaskId}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn;
