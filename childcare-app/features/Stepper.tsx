interface Props {
  steps: { id: string; title: string }[];
  current: number;
  onStepClick: (index: number) => void;
}
export default function Stepper({ steps, current, onStepClick }: Props) {
  return (
    <nav className="w-48">
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.id}>
            <button
              className={`w-full text-left p-2 rounded ${current === i ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
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
