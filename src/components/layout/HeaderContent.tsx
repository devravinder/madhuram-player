import Avatar from "../Avatar";
import { HeaderContainer } from "../Elements";
import ThemeToggle from "../ThemeToggle";
import UserProfileDropDown from "../UserProfileDropDown";

export default function HeaderContent() {
  return (
    <>
      <HeaderContainer>
        <Avatar src="/favicon.svg" name="Avatar" />
        <div className="flex flex-row gap-2">
          <ThemeToggle />
          <UserProfileDropDown/>
        </div>
      </HeaderContainer>
    </>
  );
}
