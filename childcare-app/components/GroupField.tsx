import { useFieldArray, useFormContext } from 'react-hook-form'
import { FieldSpec } from '../types/field'
import React, { useState } from 'react'

interface Props {
  field: FieldSpec
  renderField: (f: FieldSpec) => React.ReactNode
}

export default function GroupField({ field, renderField }: Props) {
  const { control, watch } = useFormContext()
  const { fields, append, remove } = useFieldArray({ control, name: field.id })
  const values: any[] = watch(field.id) || []
  const [editingIndex, setEditingIndex] = useState<number | null>(null)

  const startAdd = () => {
    append({})
    setEditingIndex(fields.length)
  }

  const saveRow = () => setEditingIndex(null)

  const cancelRow = (index: number) => {
    remove(index)
    setEditingIndex(null)
  }

  return (
    <div className="form-group-wrapper">
      <h3 className="font-semibold mb-2">{field.label}</h3>
      {fields.length > 0 && (
        <table className="modern-table">
          <thead>
            <tr>
              {field.fields?.map(child => (
                <th key={child.id}>{child.label}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fields.map((item, index) => (
              <tr key={item.id}>
                {editingIndex === index
                  ? field.fields?.map(child => (
                      <td key={child.id}>
                        {renderField({ ...child, id: `${field.id}.${index}.${child.id}` })}
                      </td>
                    ))
                  : field.fields?.map(child => (
                      <td key={child.id}>{values?.[index]?.[child.id] ?? ''}</td>
                    ))}
                <td>
                  {editingIndex === index ? (
                    <>
                      <button type="button" className="button-primary text-sm" onClick={saveRow}>
                        Save
                      </button>
                      <button type="button" className="button-secondary text-sm" onClick={() => cancelRow(index)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button type="button" className="button-secondary text-sm" onClick={() => remove(index)}>
                      Remove
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {editingIndex === null && (
        <button type="button" className="button-primary text-sm" onClick={startAdd}>
          Add
        </button>
      )}
    </div>
  )
}
