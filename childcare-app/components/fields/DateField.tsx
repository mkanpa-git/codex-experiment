import { useFormContext } from 'react-hook-form'
import Tooltip from './Tooltip'
import { getError } from '../../utils/getError'
interface Props {
  id: string
  label: string
  required?: boolean
  tooltip?: string
}
export default function DateField({ id, label, required, tooltip }: Props) {

  const { register, formState: { errors }, clearErrors } = useFormContext()
  const error = getError(errors, id)
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="required-asterisk">*</span>}
      </label>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <input id={id} type="date" title={tooltip} {...register(id, { required, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) })} className="w-full" />
        </Tooltip>
      ) : (
        <input id={id} type="date" title={tooltip} {...register(id, { required, onChange: () => clearErrors(id), onBlur: () => clearErrors(id) })} className="w-full" />
      )}
      {error && (
        <p className="form-error-alert">{(error as any).message as string}</p>
      )}
    </div>
  )
}
