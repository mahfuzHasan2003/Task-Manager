import { FaHourglassHalf } from "react-icons/fa";
import "@/components/my-components/specific-scroll-color.css";
import { SortableContext } from "@dnd-kit/sortable";
import useGetTasks from "@/hooks/use-get-tasks";
import SingleTask from "./single-task";

const InProgressTasks = () => {
  const { data = {}, isLoading } = useGetTasks(
    ["inProgressTasks"],
    "in-progress"
  );
  const { success, userTasks = [] } = data;
  return (
    <div
      className="lg:flex-1 bg-yellow-500/40 rounded-md overflow-y-auto"
      id="in-progress"
    >
      <h4 className="sticky top-0 bg-yellow-400 text-yellow-800 py-5 px-2 text-xl font-bold">
        <span className="inline-flex items-center gap-2">
          <FaHourglassHalf /> In Progress..
        </span>
      </h4>
      {/* <SortableContext> */}
      <div className="p-5 space-y-3">
        {userTasks &&
          userTasks?.map((task) => <SingleTask key={task?._id} task={task} />)}
      </div>
      {/* </SortableContext> */}
    </div>
  );
};

export default InProgressTasks;
