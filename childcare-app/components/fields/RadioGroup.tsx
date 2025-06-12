import { useFormContext } from 'react-hook-form'
import { getError } from '../../utils/getError'
interface Props {
  id: string;
  label: string;
  options: string[];
  required?: boolean;
}
export default function RadioGroup({ id, label, options, required }: Props) {
  const { register, formState: { errors }, clearErrors } = useFormContext()
  const error = getError(errors, id)
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
      {error && (
        <p className="form-error-alert">{(error as any).message as string}</p>
      )}
    </fieldset>
  )
}
