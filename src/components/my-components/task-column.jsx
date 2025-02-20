import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SingleTask from "./single-task";
import "@/components/my-components/specific-scroll-color.css";

const TaskColumn = ({ id, title, icon: Icon, tasks, bgColor, textColor }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div
      className={`lg:flex-1 ${bgColor} rounded-md flex flex-col overflow-hidden`}
    >
      <h4
        className={`sticky top-0 z-10 ${textColor} py-5 px-2 text-xl font-bold`}
      >
        <span className="inline-flex gap-2 items-center">
          <Icon /> {title}
        </span>
      </h4>
      <div
        className="flex-1 overflow-y-auto p-5 space-y-3"
        ref={setNodeRef}
        id={id}
      >
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SingleTask key={task._id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn;
