import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'

interface Props {
  title: string
  content: string
  collapsible?: boolean
  defaultCollapsed?: boolean
}

export default function InfoBlock({ title, content, collapsible, defaultCollapsed }: Props) {
  const [collapsed, setCollapsed] = useState<boolean>(defaultCollapsed ?? false)

  return (
    <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-400">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => collapsible && setCollapsed(c => !c)}>
        <h3 className="font-semibold mb-2">{title}</h3>
        {collapsible && (
          <button type="button" className="text-sm underline">
            {collapsed ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      {(!collapsible || !collapsed) && (
        <ReactMarkdown className="whitespace-pre-line">{content}</ReactMarkdown>
      )}
    </div>
  )
}
