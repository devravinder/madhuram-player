import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import tw from "tailwind-styled-components";


export const MobileLayout = tw.div`h-screen w-full flex items-center justify-center p-4 bg-linear-to-br from-background via-background to-primary/5`
export const MobileContainer = tw.div`w-full h-full max-w-sm p-6 py-20 flex flex-col justify-center items-center gap-8 bg-card rounded-2xl border border-border hover:border-border/80 transition-all duration-300 shadow-xl`


// Note:- don't change these layout elements (carefull)
export const Layout = tw.div`h-screen w-full overflow-hidden bg-background text-foreground`;
export const Footer = tw.footer`glass fixed bottom-0 left-0 right-0 h-16 flex items-center justify-center px-4 z-10`;
export const Main = tw.main`absolute pb-16 inset-0 overflow-y-auto`; // p=16

export const MainContainer = tw.section`h-full flex flex-col relative`;

export const MainSection = tw.section`flex-1 overflow-y-auto px-4 py-2`; // part of Main ( Main = MainContainer(MainSection + Player )

// like main layout but for Page (route)
export const PageLayout = tw.section`relative h-full flex flex-col gap-6 px-4 pt-2`;
export const PageHeader = tw.h1``;
export const PageMain = tw.div`flex-1 overflow-y-auto`;
export const PageMainContainer = tw.div`h-full flex flex-col relative`;
export const PageMainSection = tw.div`flex-1`;

// Elements

export const IconButton = tw.button`h-10 w-10 relative cursor-pointer bg-accent flex flex-row justify-center items-center rounded-lg`;
export const HeaderIcon = tw(
  IconButton
)`p-2 h-12 w-12 sm:h-14 sm:w-14 rounded-xl cursor-default`;

export const HeaderTitle = tw.div`text-xl sm:text-2xl font-bold line-clamp-1`;
export const HeaderSubTitle = tw.div`text-xs sm:text-md text-muted-foreground`;

export const AvatarContainer = tw.div`text-foreground rounded-lg relative inline-flex items-center justify-center overflow-hidden select-none h-10 w-10`;
export const Img = tw.img`h-full w-full rounded-2xl object-contain object-center`;
export const CoverImg = tw.img`h-full w-full rounded-lg object-cover`
export const Uppercase = tw.span`font-semibold uppercase`;

export const Card = tw.div`bg-card text-card-foreground shadow rounded-md p-4`;

export const SongItem = tw.div<{
  $active: boolean;
}>`group flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200  ${(
  p
) => (p.$active ? "bg-primary/10" : "hover:bg-secondary/50")}`;

export const Nav = tw.nav`flex items-center justify-around py-2 w-full max-w-5xl`;

export const NavLink = tw(
  Link
)`text-muted-foreground flex flex-col items-center gap-1 px-2 py-1 sm:px-4 sm:py-2 rounded-lg transition-colors`;

export const Input = tw.input`w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`;

export const Like = tw(Heart)<{ $liked?: boolean }>`${(p) =>
  p.$liked
    ? "fill-red-500 text-red-500"
    : "text-foreground"} w-5 h-5 transition-all`;

export const Clickable = tw.div<{ $clickable: boolean }>`${(p) =>
  p.$clickable ? "cursor-pointer" : ""} `;

const Secondary = tw.button`cursor-pointer p-2 sm:px-6  sm:py-3 text-xl flex flex-row justify-center items-center gap-2 rounded-lg bg-accent hover:bg-accent/80`;
const Primary = tw(Secondary)`bg-primary hover:bg-primary/90 text-secondary`;
// eslint-disable-next-line react-refresh/only-export-components
export const Button = {
  Primary,
  Secondary,
};
