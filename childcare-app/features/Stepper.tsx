interface Props {
  steps: { id: string; title: string }[];
  current: number;
  onStepClick: (index: number) => void;
}
export default function Stepper({ steps, current, onStepClick }: Props) {
  return (
    <nav className="w-64 ml-8">
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
