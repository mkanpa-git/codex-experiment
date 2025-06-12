import { useFormContext } from 'react-hook-form'
interface Props {
  id: string;
  label: string;
  required?: boolean;
  multiple?: boolean;
  accept?: string;
}
export default function FileUploadField({ id, label, required, multiple, accept }: Props) {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        type="file"
        {...register(id, { required })}
        multiple={multiple}
        accept={accept}
        className="block"
      />
      {errors[id] && (
        <p className="text-red-600 text-sm">This file is required.</p>
      )}
    </div>
  )
}
