import { useState } from 'react'
import { FormProvider, useForm, useFieldArray } from 'react-hook-form'
import TextField from './fields/TextField'
import SelectField from './fields/SelectField'
import RadioGroup from './fields/RadioGroup'
import CheckboxGroup from './fields/CheckboxGroup'
import FileUploadField from './fields/FileUploadField'
import DateField from './fields/DateField'
import TimeField from './fields/TimeField'
import InfoBlock from './fields/InfoBlock'
import Stepper from '../features/Stepper'
import formSpec from '../childcare_form.json'
import { evaluateCondition } from '../utils/conditions'
import { buildConditionalSchema } from '../utils/schemaBuilder'

type FieldSpec = {
  id: string
  label?: string
  title?: string
  type: string
  required?: boolean
  requiredCondition?: any
  visibilityCondition?: any
  ui?: { options?: any }
  placeholder?: string
  content?: string
  metadata?: { multiple?: boolean; proofCategory?: string }
  constraints?: { allowedTypes?: string[]; pattern?: string; maxFileSizeMB?: number }
  fields?: FieldSpec[]
}

export default function FormRenderer() {
  const steps = formSpec.form.steps
  const [stepIndex, setStepIndex] = useState(0)
  const stepFields = steps[stepIndex].sections?.flatMap((sec: any) => sec.fields || []) || []
  const schema = buildConditionalSchema(stepFields)
  const methods = useForm({ mode: 'onBlur', resolver: async (values) => {
    try {
      const data = schema.parse(values)
      return { values: data, errors: {} }
    } catch (e: any) {
      return { values: {}, errors: e.formErrors.fieldErrors }
    }
  } })

  const currentStep = steps[stepIndex]
  const onSubmit = methods.handleSubmit((data) => {
    console.log('submit', data)
  })

  const saveDraft = () => {
    console.log('autosave', methods.getValues())
  }

  const goNext = () => {
    saveDraft()
    setStepIndex(i => Math.min(i + 1, steps.length - 1))
  }

  const goPrev = () => {
    saveDraft()
    setStepIndex(i => Math.max(i - 1, 0))
  }

  const data = methods.watch()

  const renderField = (f: FieldSpec) => {
    if (f.visibilityCondition && !evaluateCondition(f.visibilityCondition, data)) {
      return null
    }
    switch (f.type) {
      case 'text':
        return <TextField key={f.id} id={f.id} label={f.label || ''} required={f.required} placeholder={f.placeholder} />
      case 'tel':
      case 'email':
        return <TextField key={f.id} id={f.id} label={f.label || ''} required={f.required} placeholder={f.placeholder} />
      case 'number':
        return <TextField key={f.id} id={f.id} label={f.label || ''} required={f.required} placeholder={f.placeholder} />
      case 'select':
        return <SelectField key={f.id} id={f.id} label={f.label || ''} options={Array.isArray(f.ui?.options) ? f.ui.options : []} required={f.required} />
      case 'radio':
        return <RadioGroup key={f.id} id={f.id} label={f.label || ''} options={f.ui?.options || []} required={f.required} />
      case 'checkbox':
        return <CheckboxGroup key={f.id} id={f.id} label={f.label || ''} options={f.ui?.options || []} required={f.required} />
      case 'date':
        return <DateField key={f.id} id={f.id} label={f.label || ''} required={f.required} />
      case 'time':
        return <TimeField key={f.id} id={f.id} label={f.label || ''} required={f.required} />
      case 'file':
        return (
          <FileUploadField
            key={f.id}
            id={f.id}
            label={f.label || ''}
            required={f.required}
            multiple={f.metadata?.multiple}
            accept={f.constraints?.allowedTypes?.join(',')}
          />
        )
      case 'info':
        return <InfoBlock key={f.id} title={f.title || ''} content={f.content || ''} />
      case 'group':
        return <GroupField key={f.id} field={f} />
      default:
        return null
    }
  }

  function GroupField({ field }: { field: FieldSpec }) {
    const { control } = methods
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

  return (
    <div className="flex">
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">{currentStep.title}</h2>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="space-y-4">
            {currentStep.sections?.map(sec => (
              <div key={sec.id}>
                {sec.type === 'info' ? (
                  <InfoBlock title={sec.title || ''} content={sec.content || ''} />
                ) : (
                  sec.fields?.map(renderField)
                )}
              </div>
            ))}
            <div className="flex justify-between">
              <button type="button" disabled={stepIndex === 0} onClick={goPrev} className="px-4 py-2 bg-gray-300 rounded">Back</button>
              {stepIndex < steps.length - 1 ? (
                <button type="button" onClick={goNext} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
              ) : (
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
      <Stepper steps={steps.map(s => ({ id: s.id, title: s.title }))} current={stepIndex} onStepClick={i => { saveDraft(); setStepIndex(i) }} />
    </div>
  )
}
