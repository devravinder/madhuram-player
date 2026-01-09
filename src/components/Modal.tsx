
import { type ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import tw from 'tailwind-styled-components'

const ModalContainer = tw.div`fixed inset-0 h-screen w-screen z-999 grid place-items-center bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300`
export default function Modal({children}:{children: ReactNode}) {
  const [ele, setElement] = useState<HTMLDivElement | null>() // like useEffect
  return (
    <div ref={setElement} >
      {ele && createPortal(<ModalContainer>{children}</ModalContainer>, document.body)}
    </div>
  )
}
