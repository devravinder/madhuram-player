import tw from "tailwind-styled-components"


// Note:- don't change these layout elements (carefull)
export const Layout = tw.div`h-screen w-full overflow-hidden bg-background text-foreground`
export const Header = tw.header`fixed top-0 left-0 right-0 h-14 bg-background border-b border-border flex items-center px-4 z-10`
export const Footer = tw.footer`fixed bottom-0 left-0 right-0 h-14 bg-background border-t border-border flex items-center justify-between px-4 z-10`
export const Main = tw.main`absolute top-14 bottom-14 left-0 right-0 overflow-y-auto px-4 py-3`


// Elements

export const IconButton = tw.button`h-10 w-10 relative cursor-pointer bg-accent flex flex-row justify-center items-center rounded-lg`

export const AvatarContainer = tw.div`bg-background text-foreground relative inline-flex items-center justify-center overflow-hidden select-none h-10 w-10`
export const Img = tw.img`h-full w-full object-cover`
export const Uppercase = tw.span`font-semibold uppercase`

export const Card = tw.div`bg-card text-card-foreground shadow rounded-md p-4`