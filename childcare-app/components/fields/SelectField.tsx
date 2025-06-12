import { useFormContext } from 'react-hook-form'
import Tooltip from './Tooltip'
interface Props {
  id: string
  label: string
  options: string[]
  required?: boolean
  multiple?: boolean
  tooltip?: string
}
export default function SelectField({ id, label, options, required, multiple, tooltip }: Props) {
  const { register, formState: { errors }, setValue } = useFormContext()

  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
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
                if (multiple) {
                  const vals = Array.from(e.target.selectedOptions).map(o => o.value)
                  setValue(id, vals)
                }
              }
            })}
            className="border rounded p-2 w-full"
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
            if (multiple) {
              const vals = Array.from(e.target.selectedOptions).map(o => o.value)
              setValue(id, vals)
            }
          } })}
          className="border rounded p-2 w-full"
        >
          {!multiple && <option value="">Select...</option>}

          {options.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      )}
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </div>
  )
}
