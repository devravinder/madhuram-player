import type { RoutePath } from "@/AppRouter";
import { Clock, Heart, Import, Library, ListMusic, User } from "lucide-react";
import { Nav, NavLink } from "./Elements";

type NavItem = {
  path: RoutePath;
  label: string;
  icon: typeof User;
};

const navItems: NavItem[] = [
  { path: "/", label: "Favourites", icon: Heart },
  { path: "/library", label: "Library", icon: Library },
  { path: "/recent", label: "Recent", icon: Clock },
  { path: "/playlists", label: "Playlists", icon: ListMusic },
  { path: "/import", label: "Import", icon: Import },
];
export function Navigation() {
  return (
    <Nav>
      {navItems.map((item) => (
        <NavLink
          to={item.path}
          key={item.path}
          activeProps={{
            className: "text-primary",
          }}
          activeOptions={{ exact: true }}
        >
          <item.icon size={20} />
          <span className="text-xs">{item.label}</span>
        </NavLink>
      ))}
    </Nav>
  );
}
