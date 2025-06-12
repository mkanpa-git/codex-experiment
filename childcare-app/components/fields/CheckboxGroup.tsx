import { useFormContext } from 'react-hook-form'

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
  const { register, formState: { errors } } = useFormContext()
  return (
    <fieldset className="mb-4">
      <legend className="font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </legend>
      {options.map(opt => (
        <label key={opt.value} className="block">
          <input type="checkbox" value={opt.value} {...register(id, { required })} className="mr-2" />
          {opt.label}
        </label>
      ))}
      {errors[id] && (
        <p className="form-error-alert">This field is required.</p>
      )}
    </fieldset>
  )
}
