import { useFormContext } from 'react-hook-form'
import Tooltip from './Tooltip'
interface Props {
  id: string
  label: string
  required?: boolean
  tooltip?: string
}
export default function TimeField({ id, label, required, tooltip }: Props) {

  const { register, formState: { errors }, clearErrors } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <input id={id} type="time" title={tooltip} {...register(id, { required, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) })} className="w-full" />
        </Tooltip>
      ) : (
        <input id={id} type="time" title={tooltip} {...register(id, { required, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) })} className="w-full" />
      )}

      {errors[id] && (
        <p className="form-error-alert">{errors[id].message as string}</p>
      )}
    </div>
  )
}
