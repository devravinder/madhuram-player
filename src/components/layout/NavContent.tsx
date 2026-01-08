import { Clock, Home, Library, ListMusic, User } from "lucide-react";
import { Nav, NavButton } from "../Elements";

interface NavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function NavContent({ activeTab, onTabChange }: NavProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "library", label: "Library", icon: Library },
    { id: "recent", label: "Recent", icon: Clock },
    { id: "playlists", label: "Playlists", icon: ListMusic },
    { id: "profile", label: "Profile", icon: User },
  ];

  return (
    <Nav>
      {navItems.map((item) => (
        <NavButton
          $active={activeTab === item.id}
          key={item.id}
          onClick={() => onTabChange(item.id)}
        >
          <item.icon size={20} />
          <span className="text-xs">{item.label}</span>
        </NavButton>
      ))}
    </Nav>
  );
}
