import Avatar from "../Avatar";
import ThemeToggle from "../ThemeToggle";

export default function HeaderContent() {
  return (
    <>
      <h1 className="w-full flex flex-row justify-between items-center cursor-pointer">
        <Avatar src="/favicon.svg" name="Avatar" />
        <ThemeToggle />
      </h1>
    </>
  );
}
