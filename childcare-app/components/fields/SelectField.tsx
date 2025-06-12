import { useFormContext } from 'react-hook-form'
import Tooltip from './Tooltip'
import { getError } from '../../utils/getError'
interface Props {
  id: string
  label: string
  options: string[]
  required?: boolean
  multiple?: boolean
  tooltip?: string
}
export default function SelectField({ id, label, options, required, multiple, tooltip }: Props) {
  const { register, formState: { errors }, setValue, clearErrors } = useFormContext()
  const error = getError(errors, id)

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <select
            id={id}
            multiple={multiple}
            title={tooltip}
            {...register(id, {
              required,
              onChange: e => {
                clearErrors(id)
                if (multiple) {
                  const vals = Array.from(e.target.selectedOptions).map(o => o.value)
                  setValue(id, vals)
                }
              },
              onBlur: () => clearErrors(id)
            })}
            className="w-full"
          >
            {!multiple && <option value="">Select...</option>}

            {options.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </Tooltip>
      ) : (
        <select
          id={id}
          multiple={multiple}
          title={tooltip}
          {...register(id, { required, onChange: e => {
            clearErrors(id)
            if (multiple) {
              const vals = Array.from(e.target.selectedOptions).map(o => o.value)
              setValue(id, vals)
            }
          }, onBlur: () => clearErrors(id) })}
          className="w-full"
        >
          {!multiple && <option value="">Select...</option>}

          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
      {error && (
        <p className="form-error-alert">{(error as any).message as string}</p>
      )}
    </div>
  )
}
