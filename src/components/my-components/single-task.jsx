import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import moment from "moment";
import {
  Pencil,
  Trash2,
  Save,
  X,
  ArrowRight,
  ArrowRightToLine,
} from "lucide-react";
import socket from "@/socket";
import useAuth from "@/hooks/use-auth";

const SingleTask = ({
  task,
  isDragging,
  isEditing,
  editingTaskId,
  setEditingTaskId,
}) => {
  const [editedTask, setEditedTask] = useState(task);
  const { title, description, timestamp, status, _id } = task;
  const { user } = useAuth();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: _id,
      data: { status },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    socket.emit("updateTask", { ...editedTask, email: user.email });
    setEditingTaskId(null);
  };

  const handleInputChange = (e, field) => {
    e.stopPropagation();
    setEditedTask({ ...editedTask, [field]: e.target.value });
  };

  if (isEditing) {
    return (
      <Card className="cursor-default">
        <CardHeader>
          <Input
            value={editedTask.title}
            onChange={(e) => handleInputChange(e, "title")}
            onClick={(e) => e.stopPropagation()}
          />
        </CardHeader>
        <CardContent>
          <Textarea
            value={editedTask.description}
            onChange={(e) => handleInputChange(e, "description")}
            onClick={(e) => e.stopPropagation()}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          <Button variant="outline" onClick={() => setEditingTaskId(null)}>
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className="cursor-move relative pr-12 min-h-38"
    >
      {/* card contents */}
      <div {...listeners} {...attributes}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardFooter className="text-xs text-muted-foreground">
          {moment(timestamp).format("D MMM YYYY — h:mmA")}
        </CardFooter>
      </div>
      {/* controls for task */}
      <div className="flex flex-col gap-1 p-1 absolute right-0 top-0">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditingTaskId(_id)}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            socket.emit("deleteTask", {
              taskId: _id,
              email: user.email,
            });
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {status !== "finished" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              //
            }}
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
        {status === "todo" && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              //
            }}
          >
            <ArrowRightToLine className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
};

export default SingleTask;
