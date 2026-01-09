import { User } from "lucide-react";
import Avatar from "../Avatar";
import { IconButton } from "../Elements";
import ThemeToggle from "../ThemeToggle";

export default function HeaderContent() {
  return (
    <>
      <h1 className="w-full flex flex-row justify-between items-center cursor-pointer">
        <Avatar src="/favicon.svg" name="Avatar" />
        <div className="flex flex-row gap-2">
          <ThemeToggle />
          <IconButton>
            <User className="h-5 w-5"></User>
            <span className="sr-only">Profile</span>
          </IconButton>
        </div>
      </h1>
    </>
  );
}
