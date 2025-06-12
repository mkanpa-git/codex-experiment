import { useFieldArray, useFormContext } from 'react-hook-form'
import { FieldSpec } from '../types/field'
import React from 'react'

interface Props {
  field: FieldSpec
  renderField: (f: FieldSpec) => React.ReactNode
}

export default function GroupField({ field, renderField }: Props) {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: field.id })

  return (
    <div className="mb-6 border p-2">
      <h3 className="font-semibold mb-2">{field.label}</h3>
      {fields.map((item, index) => (
        <div key={item.id} className="mb-4">
          {field.fields?.map(child => {
            const childId = `${field.id}.${index}.${child.id}`
            return renderField({ ...child, id: childId })
          })}
          <button type="button" className="text-sm text-red-600" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      <button type="button" className="text-sm text-blue-600" onClick={() => append({})}>Add</button>
    </div>
  )
}
