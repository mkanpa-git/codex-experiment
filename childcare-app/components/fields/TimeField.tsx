import { useFormContext } from 'react-hook-form'
interface Props {
  id: string
  label: string
  required?: boolean
}
export default function TimeField({ id, label, required }: Props) {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input id={id} type="time" {...register(id, { required })} className="border rounded p-2 w-full" />
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </div>
  )
}
