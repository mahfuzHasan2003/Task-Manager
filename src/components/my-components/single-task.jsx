import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";

const SingleTask = ({ task }) => {
  const { title, description, timestamp, status } = task;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="">
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
