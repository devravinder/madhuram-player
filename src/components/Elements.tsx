import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import tw from "tailwind-styled-components";

// Note:- don't change these layout elements (carefull)
export const Layout = tw.div`h-screen w-full overflow-hidden bg-background text-foreground`;
export const Header = tw.header`glass fixed top-0 left-0 right-0 h-14 flex items-center px-4 z-10`;
export const Footer = tw.footer`glass fixed bottom-0 left-0 right-0 h-14 flex items-center justify-center px-4 z-10`;
export const Main = tw.main`absolute py-14 inset-0 overflow-y-auto`; // p=14

export const MainContainer = tw.section`h-full flex flex-col relative`;
export const HeaderContainer = tw.h1`w-full flex flex-row justify-between items-center cursor-pointer`;

export const MainSection = tw.section`flex-1 overflow-y-auto px-4 py-3`; // part of Main ( Main = MainContainer(MainSection + Player )

// like main layout but for Page (route)
export const PageLayout = tw.section`relative h-full flex flex-col gap-8 p-4`;
export const PageHeader = tw.h1``;
export const PageFooter = tw.div`fixed bottom-0 left-0 right-0 h-14`;
export const PageMain = tw.div`flex-1 overflow-y-auto`;
export const PageMainContainer = tw.div`h-full flex flex-col relative`;
export const PageMainSection = tw.div`flex-1`;

// Elements

export const IconButton = tw.button`h-10 w-10 relative cursor-pointer bg-accent flex flex-row justify-center items-center rounded-lg`;

export const AvatarContainer = tw.div`text-foreground rounded-lg relative inline-flex items-center justify-center overflow-hidden select-none h-10 w-10`;
export const Img = tw.img`h-full w-full object-contain object-center`;
export const Uppercase = tw.span`font-semibold uppercase`;

export const Card = tw.div`bg-card text-card-foreground shadow rounded-md p-4`;

export const Nav = tw.nav`flex items-center justify-around py-2 w-full max-w-5xl`;

export const NavLink = tw(
  Link
)`text-muted-foreground flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors`;

export const Input = tw.input`w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200`;

export const Like = tw(Heart)<{ $liked?: boolean }>`${(p) =>
  p.$liked
    ? "fill-red-500 text-red-500"
    : "text-muted-foreground"} w-5 h-5 transition-all`;
