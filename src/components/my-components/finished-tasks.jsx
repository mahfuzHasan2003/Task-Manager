import { LucideCheckCheck } from "lucide-react";
import "@/components/my-components/specific-scroll-color.css";

const FinishedTasks = () => {
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
      <p className="p-5"></p>
    </div>
  );
};

export default FinishedTasks;
