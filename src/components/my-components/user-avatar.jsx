import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuth from "@/hooks/use-auth";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const UserAvatar = () => {
  const {
    user: {
      displayName = "Anonymous User",
      photoURL = "https://cdn-icons-png.flaticon.com/512/219/219983.png",
    },
  } = useAuth();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Avatar>
          <AvatarImage src={photoURL} referrerPolicy="no-referrer" />
          <AvatarFallback>{displayName[0]}</AvatarFallback>
        </Avatar>
      </TooltipTrigger>
      <TooltipContent>
        <p>{displayName}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default UserAvatar;
