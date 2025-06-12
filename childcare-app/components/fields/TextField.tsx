import { useFormContext } from 'react-hook-form'
import Tooltip from './Tooltip'
import { sanitizePattern } from '../../utils/regex'
interface Props {
  id: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
  tooltip?: string
  pattern?: string
}
export default function TextField({ id, label, type = 'text', required, placeholder, tooltip, pattern }: Props) {
  const { register, formState: { errors } } = useFormContext()
  let regex: RegExp | undefined
  if (pattern) {
    try {
      regex = new RegExp(sanitizePattern(pattern))
    } catch (e) {
      console.warn('Invalid regex pattern:', pattern)
    }
  }
  const validation = { required, pattern: regex }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <input
            id={id}
            type={type}
            title={tooltip}
            {...register(id, validation)}
            placeholder={placeholder}
            className="border rounded p-2 w-full"
          />
        </Tooltip>
      ) : (
        <input
          id={id}
          type={type}
          title={tooltip}
          {...register(id, validation)}
          placeholder={placeholder}
          className="border rounded p-2 w-full"
        />
      )}
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </div>
  )
}
