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
  const { register, formState: { errors }, clearErrors } = useFormContext()
  let regex: RegExp | undefined
  if (pattern) {
    try {
      regex = new RegExp(sanitizePattern(pattern))
    } catch (e) {
      console.warn('Invalid regex pattern:', pattern)
    }
  }
  const validation = { required, pattern: regex, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) }

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <input
            id={id}
            type={type}
            title={tooltip}
            {...register(id, validation)}
            placeholder={placeholder}
            className="w-full"
          />
        </Tooltip>
      ) : (
        <input
          id={id}
          type={type}
          title={tooltip}
          {...register(id, validation)}
          placeholder={placeholder}
          className="w-full"
        />
      )}
      {errors[id] && (
        <p className="form-error-alert">{errors[id].message as string}</p>
      )}
    </div>
  )
}
