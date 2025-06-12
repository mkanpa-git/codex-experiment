import { z, ZodTypeAny } from 'zod'
import { Condition, evaluateCondition } from './conditions'
import { FieldSpec } from '../types/field'

export function buildSchema(fields: FieldSpec[]): ZodTypeAny {
  const shape: Record<string, ZodTypeAny> = {}
  for (const field of fields) {
    let schema: ZodTypeAny
    if (field.type === 'group') {
      const inner = buildSchema(field.fields || [])
      schema = field.metadata?.multiple ? z.array(inner) : inner
    } else {
      switch (field.type) {
        case 'checkbox':
          schema = z.array(z.string())
          break
        case 'select':
          if (field.metadata?.multiple) {
            schema = z.array(z.string())
            if (field.constraints?.minSelections) {
              schema = schema.min(field.constraints.minSelections)
            }
            if (field.constraints?.maxSelections) {
              schema = schema.max(field.constraints.maxSelections)
            }
          } else {
            schema = z.string()
          }
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
    }
    shape[field.id] = schema
  }
  return z.object(shape)
}

export function buildConditionalSchema(fields: FieldSpec[]) {
  const base = buildSchema(fields)

  function applyConditions(fs: FieldSpec[], obj: any, path: (string | number)[], ctx: any) {
    for (const f of fs) {
      const currentPath = [...path, f.id]
      if (f.type === 'group') {
        const groupData = obj[f.id]
        if (f.metadata?.multiple && Array.isArray(groupData)) {
          groupData.forEach((item: any, idx: number) => {
            applyConditions(f.fields || [], item ?? {}, [...currentPath, idx], ctx)
          })
        } else if (!f.metadata?.multiple && groupData) {
          applyConditions(f.fields || [], groupData, currentPath, ctx)
        }
        continue
      }

      if (f.requiredCondition) {
        const cond = f.requiredCondition as Condition
        if (evaluateCondition(cond, obj) && (obj[f.id] === undefined || obj[f.id] === '')) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Required', path: currentPath })
        }
      }
    }
  }

  return base.superRefine((data, ctx) => {
    applyConditions(fields, data, [], ctx)
  })
}
