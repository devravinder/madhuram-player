import tw from "tailwind-styled-components";

// Note:- don't change these layout elements (carefull)
export const Layout = tw.div`h-screen w-full overflow-hidden bg-background text-foreground`;
export const Header = tw.header`glass fixed top-0 left-0 right-0 h-14 flex items-center px-4 z-10`;
export const Footer = tw.footer`glass fixed bottom-0 left-0 right-0 h-14 flex items-center justify-center px-4 z-10`;
export const Main = tw.main`absolute py-17 left-0 right-0 overflow-y-auto px-4`; // p=14+3

// Elements

export const IconButton = tw.button`h-10 w-10 relative cursor-pointer bg-accent flex flex-row justify-center items-center rounded-lg`;

export const AvatarContainer = tw.div`text-foreground rounded-lg relative inline-flex items-center justify-center overflow-hidden select-none h-10 w-10`;
export const Img = tw.img`h-full w-full object-contain object-center`;
export const Uppercase = tw.span`font-semibold uppercase`;

export const Card = tw.div`bg-card text-card-foreground shadow rounded-md p-4`;

export const Nav=tw.nav`flex items-center justify-around py-2 w-full max-w-5xl`
export const NavButton = tw.button<{ $active?: boolean }>`${(p) =>
  p.$active
    ? "text-primary"
    : "text-muted-foreground"} flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors`;
