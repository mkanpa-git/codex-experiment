import { useFormContext } from 'react-hook-form'
interface Props {
  id: string
  label: string
  required?: boolean
  multiple?: boolean
  accept?: string
  maxFileSizeMB?: number
}
export default function FileUploadField({ id, label, required, multiple, accept, maxFileSizeMB }: Props) {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        type="file"
        {...register(id, {
          required,
          validate: fileList => {
            const file = (fileList as FileList)[0]
            if (!file) return true
            if (maxFileSizeMB && file.size > maxFileSizeMB * 1024 * 1024) {
              return `Max size ${maxFileSizeMB}MB`
            }
            if (accept && !accept.split(',').includes(file.type)) {
              return 'Invalid file type'
            }
            return true
          }
        })}
        multiple={multiple}
        accept={accept}
        className="block"
      />
      {errors[id] && (
        <p className="text-red-600 text-sm">{errors[id].message as string}</p>
      )}
    </div>
  )
}
