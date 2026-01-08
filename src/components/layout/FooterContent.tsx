import { useState } from "react";
import { NavContent } from "./NavContent";

export default function FooterContent() {
  const [activeTab, setActiveTab] = useState("home");
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <>
      <NavContent activeTab={activeTab} onTabChange={handleTabChange} />
    </>
  );
}
