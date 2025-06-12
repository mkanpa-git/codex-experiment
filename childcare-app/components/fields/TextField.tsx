import { useFormContext } from 'react-hook-form'
interface Props {
  id: string;
  label: string;
  required?: boolean;
  placeholder?: string;
}
export default function TextField({ id, label, required, placeholder }: Props) {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="border rounded p-2 w-full"
      />
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </div>
  )
}
