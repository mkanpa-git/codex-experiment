import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import TextField from './fields/TextField'
import SelectField from './fields/SelectField'
import RadioGroup from './fields/RadioGroup'
import FileUploadField from './fields/FileUploadField'
import Stepper from '../features/Stepper'
import formSpec from '../childcare_form.json'

type FieldSpec = {
  id: string
  label: string
  type: string
  required?: boolean
  ui?: { options?: string[] }
  placeholder?: string
  metadata?: { multiple?: boolean; proofCategory?: string }
  constraints?: { allowedTypes?: string[] }
}

export default function FormRenderer() {
  const steps = formSpec.form.steps
  const [stepIndex, setStepIndex] = useState(0)
  const methods = useForm({ mode: 'onBlur' })

  const currentStep = steps[stepIndex]
  const onSubmit = methods.handleSubmit((data) => {
    console.log('submit', data)
  })

  const renderField = (f: FieldSpec) => {
    switch (f.type) {
      case 'text':
        return <TextField key={f.id} id={f.id} label={f.label} required={f.required} placeholder={f.placeholder} />
      case 'select':
        return <SelectField key={f.id} id={f.id} label={f.label} options={f.ui?.options || []} required={f.required} />
      case 'radio':
        return <RadioGroup key={f.id} id={f.id} label={f.label} options={f.ui?.options || []} required={f.required} />
      case 'file':
        return <FileUploadField key={f.id} id={f.id} label={f.label} required={f.required} multiple={f.metadata?.multiple} accept={f.constraints?.allowedTypes?.join(',')} />
      default:
        return null
    }
  }

  return (
    <div className="flex">
      <Stepper steps={steps.map(s => ({ id: s.id, title: s.title }))} current={stepIndex} onStepClick={setStepIndex} />
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">{currentStep.title}</h2>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="space-y-4">
            {currentStep.sections?.flatMap(sec => sec.fields || []).map(renderField)}
            <div className="flex justify-between">
              <button type="button" disabled={stepIndex === 0} onClick={() => setStepIndex(i => i - 1)} className="px-4 py-2 bg-gray-300 rounded">Back</button>
              {stepIndex < steps.length - 1 ? (
                <button type="button" onClick={() => setStepIndex(i => i + 1)} className="px-4 py-2 bg-blue-600 text-white rounded">Next</button>
              ) : (
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Submit</button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
