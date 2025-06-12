import { useFormContext } from 'react-hook-form'
import { getError } from '../../utils/getError'

interface Option {
  value: string
  label: string
}
interface Props {
  id: string
  label: string
  options: Option[]
  required?: boolean
}
export default function CheckboxGroup({ id, label, options, required }: Props) {
  const { register, formState: { errors }, clearErrors } = useFormContext()
  const error = getError(errors, id)
  return (
    <fieldset className="mb-4">
      <legend className="font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </legend>
      {options.map(opt => (
        <label key={opt.value} className="block">
          <input type="checkbox" value={opt.value} {...register(id, { required, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) })} className="mr-2" />
          {opt.label}
        </label>
      ))}
      {error && (
        <p className="form-error-alert">{(error as any).message as string}</p>
      )}
    </fieldset>
  )
}
