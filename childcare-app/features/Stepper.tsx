interface Props {
  steps: { id: string; title: string }[]
  current: number
  onStepClick: (index: number) => void
  position?: 'left' | 'right'
}
export default function Stepper({ steps, current, onStepClick, position = 'right' }: Props) {
  const marginClass = position === 'left' ? 'mr-8' : 'ml-8'
  return (
    <nav className={`w-64 ${marginClass}`} role="navigation" aria-label="Form steps">
      <ol
        className="space-y-2 p-4 rounded-2xl shadow-md"
        style={{ backgroundColor: 'var(--surface)' }}
        role="list"
      >
        {steps.map((s, i) => (
          <li key={s.id} role="listitem">
            <button
              className="w-full text-left p-2 rounded-lg"
              style={{
                backgroundColor: current === i ? 'var(--primary-color)' : 'var(--secondary-color)',
                color: current === i ? '#ffffff' : 'var(--font-color)',
              }}
              onClick={() => onStepClick(i)}
              aria-label={s.title}
              aria-current={current === i ? 'step' : undefined}
            >
              {s.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
