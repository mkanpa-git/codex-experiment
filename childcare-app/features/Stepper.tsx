interface Props {
  steps: { id: string; title: string }[]
  current: number
  onStepClick: (index: number) => void
  position?: 'left' | 'right'
}
export default function Stepper({ steps, current, onStepClick, position = 'right' }: Props) {
  const marginClass = position === 'left' ? 'mr-8' : 'ml-8'
  return (
    <nav className={`w-64 ${marginClass}`}>
      <ol className="space-y-2 bg-white p-4 rounded-2xl shadow-md">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              className={`w-full text-left p-2 rounded-lg ${current === i ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              onClick={() => onStepClick(i)}
            >
              {s.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  )
}
