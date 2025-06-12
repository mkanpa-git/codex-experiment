import { useFormContext } from 'react-hook-form'
interface Props {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
}
export default function RadioGroup({ id, label, options, required }: Props) {
  const { register, formState: { errors }, clearErrors } = useFormContext()
  return (
    <fieldset className="mb-4">
      <legend className="font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </legend>
      {options.map(opt => (
        <label key={opt} className="block">
          <input type="radio" value={opt} {...register(id, { required, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) })} className="mr-2" />
          {opt}
        </label>
      ))}
      {errors[id] && (
        <p className="form-error-alert">{errors[id].message as string}</p>
      )}
    </fieldset>
  )
}
