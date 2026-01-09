import Avatar from "../Avatar";
import ThemeToggle from "../ThemeToggle";
import UserProfileDropDown from "../UserProfileDropDown";

export default function HeaderContent() {
  return (
    <>
      <h1 className="w-full flex flex-row justify-between items-center cursor-pointer">
        <Avatar src="/favicon.svg" name="Avatar" />
        <div className="flex flex-row gap-2">
          <ThemeToggle />
          <UserProfileDropDown/>
        </div>
      </h1>
    </>
  );
}
