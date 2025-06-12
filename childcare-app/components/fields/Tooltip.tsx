import { ReactNode, useState } from 'react'

interface TooltipProps {
  content: string
  children: ReactNode
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [open, setOpen] = useState(false)
  return (
    <span
      className="relative inline-block group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className="absolute left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap bg-black text-white text-xs rounded py-1 px-2 z-10">
          {content}
        </span>
      )}
    </span>
  )
}
