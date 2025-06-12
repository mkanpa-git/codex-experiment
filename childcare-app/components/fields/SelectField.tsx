import { useFormContext } from 'react-hook-form'
interface Props {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
}
export default function SelectField({ id, label, options, required }: Props) {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <select id={id} {...register(id, { required })} className="border rounded p-2 w-full">
        <option value="">Select...</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </div>
  )
}
