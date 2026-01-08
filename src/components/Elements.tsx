import tw from "tailwind-styled-components"


// Note:- don't change these layout elements (carefull)
export const Layout = tw.div`h-screen w-full overflow-hidden bg-gray-100 text-gray-900`
export const Header = tw.header`fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center px-4 z-10`
export const Footer = tw.footer`fixed bottom-0 left-0 right-0 h-14 bg-white border-t border-gray-200 flex items-center justify-between px-4 z-10`
export const Main = tw.main`absolute top-14 bottom-14 left-0 right-0 overflow-y-auto px-4 py-3`

