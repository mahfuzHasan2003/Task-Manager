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
import { Pencil, Trash2, Save, X } from "lucide-react";
import socket from "@/socket";
import useAuth from "@/hooks/use-auth";

const SingleTask = ({ task, isDragging }) => {
  const [isEditing, setIsEditing] = useState(false);
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

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    socket.emit("updateTask", { ...editedTask, email: user.email });
    setIsEditing(false);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    socket.emit("deleteTask", { taskId: _id, email: user.email });
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
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(false);
            }}
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="cursor-move"
    >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs text-right block text-muted-foreground">
        {moment(timestamp).format("D MMM YYYY — h:mmA")}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="icon" onClick={handleEdit}>
          <Pencil className="h-4 w-4" />
        </Button>
        <Button variant="destructive" size="icon" onClick={handleDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SingleTask;
