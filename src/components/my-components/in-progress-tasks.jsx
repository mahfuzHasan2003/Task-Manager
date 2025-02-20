import { FaHourglassHalf } from "react-icons/fa";
import "@/components/my-components/specific-scroll-color.css";

const InProgressTasks = () => {
  return (
    <div
      className="lg:flex-1 bg-yellow-500/40 rounded-md overflow-y-scroll"
      id="in-progress"
    >
      <h4 className="sticky top-0 bg-yellow-400 text-yellow-800 py-5 px-2 text-xl font-bold">
        <span className="inline-flex items-center gap-2">
          <FaHourglassHalf /> In Progress..
        </span>
      </h4>
      <p className="p-5"></p>
    </div>
  );
};

export default InProgressTasks;
