import { useState, useEffect } from 'react'

import { FormProvider, useForm } from 'react-hook-form'
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
import mapZodErrors from '../utils/mapZodErrors'
import GroupField from './GroupField'
import { FieldSpec } from '../types/field'


export default function FormRenderer() {
  const steps = formSpec.form.steps
  const stepperPosition: 'left' | 'right' = (formSpec.form.layout?.stepperPosition as any) || 'right'
  const [stepIndex, setStepIndex] = useState(0)
  const stepFields = steps[stepIndex].sections?.flatMap((sec: any) => sec.fields || []) || []
  const schema = buildConditionalSchema(stepFields)
  const methods = useForm({ mode: 'onBlur', shouldUnregister: true, resolver: async (values) => {
    try {
      const data = schema.parse(values)
      return { values: data, errors: {} }
    } catch (e: any) {
      return { values: {}, errors: mapZodErrors(e.formErrors.fieldErrors) }
    }
  } })

  useEffect(() => {
    const raw = localStorage.getItem('childcareDraft')
    if (raw) {
      methods.reset(JSON.parse(raw))
    }
  }, [])


  const currentStep = steps[stepIndex]
  const onSubmit = methods.handleSubmit((data) => {
    console.log('submit', data)
  })

  const saveDraft = () => {
    const data = methods.getValues()
    localStorage.setItem('childcareDraft', JSON.stringify(data))

  }

  const validateAndSave = async () => {
    const fieldIds = stepFields.map((f: FieldSpec) => f.id)
    const valid = await methods.trigger(fieldIds)
    if (valid) {
      saveDraft()
    }
    return valid
  }

  const goNext = async () => {
    if (await validateAndSave()) {
      setStepIndex(i => Math.min(i + 1, steps.length - 1))
    }
  }

  const goPrev = async () => {
    if (await validateAndSave()) {
      setStepIndex(i => Math.max(i - 1, 0))
    }
  }

  const data = methods.watch()

  const renderField = (f: FieldSpec) => {
    if (f.visibilityCondition && !evaluateCondition(f.visibilityCondition, data)) {
      return null
    }
    if (f.requiredCondition && !evaluateCondition(f.requiredCondition as any, data)) {
      return null
    }
    switch (f.type) {
      case 'text':
        return (
          <TextField
            key={f.id}
            id={f.id}
            label={f.label || ''}
            required={f.required}
            placeholder={f.placeholder || f.ui?.placeholder}
            tooltip={f.tooltip}
            pattern={f.constraints?.pattern}
          />
        )
      case 'tel':
      case 'email':
        return (
          <TextField
            key={f.id}
            id={f.id}
            type={f.type}
            label={f.label || ''}
            required={f.required}
            placeholder={f.placeholder || f.ui?.placeholder}
            tooltip={f.tooltip}
            pattern={f.constraints?.pattern}
          />
        )
      case 'number':
        return (
          <TextField
            key={f.id}
            id={f.id}
            type="number"
            label={f.label || ''}
            required={f.required}
            placeholder={f.placeholder || f.ui?.placeholder}
            tooltip={f.tooltip}
          />
        )
      case 'select':
        return <SelectField key={f.id} id={f.id} label={f.label || ''} options={Array.isArray(f.ui?.options) ? f.ui.options : []} required={f.required} multiple={f.metadata?.multiple} tooltip={f.tooltip} />

      case 'radio':
        return <RadioGroup key={f.id} id={f.id} label={f.label || ''} options={f.ui?.options || []} required={f.required} />
      case 'checkbox':
        return <CheckboxGroup key={f.id} id={f.id} label={f.label || ''} options={f.ui?.options || []} required={f.required} />
      case 'date':
        return <DateField key={f.id} id={f.id} label={f.label || ''} required={f.required} tooltip={f.tooltip} />
      case 'time':
        return <TimeField key={f.id} id={f.id} label={f.label || ''} required={f.required} tooltip={f.tooltip} />

      case 'file':
        return (
          <FileUploadField
            key={f.id}
            id={f.id}
            label={f.label || ''}
            required={f.required}
            multiple={f.metadata?.multiple}
            accept={f.constraints?.allowedTypes?.join(',')}
            maxFileSizeMB={f.constraints?.maxFileSizeMB}
            imageResolution={f.constraints?.imageResolution}
          />
        )
      case 'info':
        return (
          <InfoBlock
            key={f.id}
            title={f.title || ''}
            content={f.content || ''}
            collapsible={f.ui?.collapsible}
            defaultCollapsed={f.ui?.defaultCollapsed}
          />
        )
      case 'group':
        return <GroupField key={f.id} field={f} renderField={renderField} />
      default:
        return null
    }
  }


  const containerClass =
    `flex flex-col ${stepperPosition === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'}`

  return (
    <div className={containerClass}>
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">{currentStep.title}</h2>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit} className="space-y-4">
            {currentStep.sections?.map(sec => (
              <section key={sec.id} className="form-section p-4">
                {sec.title && (
                  <header className="form-section-header">{sec.title}</header>
                )}
                {sec.type === 'info' ? (
                  <InfoBlock
                    title={sec.title || ''}
                    content={sec.content || ''}
                    collapsible={sec.ui?.collapsible}
                    defaultCollapsed={sec.ui?.defaultCollapsed}
                  />
                ) : (
                  sec.fields?.map(renderField)
                )}
              </section>
            ))}
            <div className="flex justify-between">
              <button type="button" disabled={stepIndex === 0} onClick={goPrev} className="button-secondary">Back</button>
              {stepIndex < steps.length - 1 ? (
                <button type="button" onClick={goNext} className="button-primary">Next</button>
              ) : (
                <button type="submit" className="button-primary">Submit</button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
      <Stepper
        steps={steps.map(s => ({ id: s.id, title: s.title }))}
        current={stepIndex}
        onStepClick={async i => {
          if (await validateAndSave()) {
            setStepIndex(i)
          }
        }}
        position={stepperPosition}
      />
    </div>
  )
}
