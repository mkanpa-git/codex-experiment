import { useFormContext } from 'react-hook-form'
import Tooltip from './Tooltip'
interface Props {
  id: string
  label: string
  required?: boolean
  tooltip?: string
}
export default function DateField({ id, label, required, tooltip }: Props) {

  const { register, formState: { errors } } = useFormContext()
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block font-medium">
        {label} {required && <span className="text-red-600">*</span>}
      </label>
      {tooltip ? (
        <Tooltip content={tooltip}>
          <input id={id} type="date" title={tooltip} {...register(id, { required })} className="border rounded p-2 w-full" />
        </Tooltip>
      ) : (
        <input id={id} type="date" title={tooltip} {...register(id, { required })} className="border rounded p-2 w-full" />
      )}
      {errors[id] && (
        <p className="text-red-600 text-sm">This field is required.</p>
      )}
    </div>
  )
}
