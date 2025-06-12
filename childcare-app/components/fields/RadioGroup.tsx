import { useFormContext } from 'react-hook-form'
interface Props {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
}
export default function RadioGroup({ id, label, options, required }: Props) {
  const { register, formState: { errors } } = useFormContext()
  return (
    <fieldset className="mb-4">
      <legend className="font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </legend>
      {options.map(opt => (
        <label key={opt} className="block">
          <input type="radio" value={opt} {...register(id, { required })} className="mr-2" />
          {opt}
        </label>
      ))}
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </fieldset>
  )
}
