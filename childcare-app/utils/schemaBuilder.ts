import { z, ZodTypeAny } from 'zod'
import { Condition, evaluateCondition } from './conditions'

type FieldSpec = any

export function buildSchema(fields: FieldSpec[]): ZodTypeAny {
  const shape: Record<string, ZodTypeAny> = {}
  for (const field of fields) {
    if (field.type === 'group') continue
    let schema: ZodTypeAny
    switch (field.type) {
      case 'checkbox':
        schema = z.array(z.string())
        break
      case 'file':
        schema = z.any()
        break
      default:
        schema = z.string()
    }
    if (field.required) {
      schema = schema.refine(v => v !== undefined && v !== '', { message: 'Required' })
    }
    if (field.constraints?.pattern) {
      const regex = new RegExp(field.constraints.pattern)
      schema = schema.regex(regex, 'Invalid format')
    }
    shape[field.id] = schema
  }
  return z.object(shape)
}

export function buildConditionalSchema(fields: FieldSpec[]) {
  const base = buildSchema(fields)
  return base.superRefine((data, ctx) => {
    for (const field of fields) {
      if (field.requiredCondition) {
        const cond = field.requiredCondition as Condition
        if (evaluateCondition(cond, data) && (data[field.id] === undefined || data[field.id] === '')) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Required', path: [field.id] })
        }
      }
    }
  })
}
