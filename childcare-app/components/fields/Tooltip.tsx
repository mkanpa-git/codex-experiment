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
      aria-label={content}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 whitespace-nowrap text-sm rounded shadow-md px-3 py-2 z-10 pointer-events-none"
          style={{ background: 'var(--secondary-color)', color: 'var(--font-color)', fontFamily: 'var(--font-family)' }}
        >
          {content}
        </span>
      )}
    </span>
  )
}
