import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDraggable } from "@dnd-kit/core";
import moment from "moment";

const SingleTask = ({ task }) => {
  const { title, description, timestamp, status, _id } = task;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: _id,
    data: { status },
  });
  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;
  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-pointer z-50"
    >
      <CardHeader>
        <CardTitle>
          {title.length > 25 ? `${title.slice(0, 25)}...` : title}
        </CardTitle>
        <CardDescription>
          {description.length > 100
            ? `${description.slice(0, 100)}...`
            : description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="text-xs text-right block text-muted-foreground">
        {moment(timestamp).format("D MMM YYYY — h:mmA")}
      </CardFooter>
    </Card>
  );
};

export default SingleTask;
