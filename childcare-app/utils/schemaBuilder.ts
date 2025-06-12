import { z, ZodTypeAny } from 'zod';
import { Condition, evaluateCondition } from './conditions';

type FieldSpec = any;

export function buildSchema(fields: FieldSpec[]): ZodTypeAny {
  const shape: Record<string, ZodTypeAny> = {};

  for (const field of fields) {
    if (field.type === 'group') continue;

    let schema: ZodTypeAny;

    // Base type handling
    switch (field.type) {
      case 'checkbox':
        schema = z.array(z.string());
        break;
      case 'file':
        schema = z.any(); // could use z.instanceof(File) in browser
        break;
      default:
        schema = z.string();
    }

    // Required field
    if (field.required) {
      schema = schema.refine(v => v !== undefined && v !== '', {
        message: 'Required',
      });
    }

    // Regex constraint (safely parsed)
    if (field.constraints?.pattern) {
      try {
        const unescapedPattern = field.constraints.pattern.replace(/\\\\/g, '\\');
        const regex = new RegExp(unescapedPattern);
        schema = schema.regex(regex, 'Invalid format');
      } catch (err) {
        console.warn(`⚠️ Invalid regex pattern for field '${field.id}': ${field.constraints.pattern}`);
      }
    }

    shape[field.id] = schema;
  }

  return z.object(shape);
}

export function buildConditionalSchema(fields: FieldSpec[]) {
  const base = buildSchema(fields);

  return base.superRefine((data, ctx) => {
    for (const field of fields) {
      if (field.requiredCondition) {
        const cond = field.requiredCondition as Condition;
        const value = data[field.id];
        const isEmpty = value === undefined || value === '' || (Array.isArray(value) && value.length === 0);

        if (evaluateCondition(cond, data) && isEmpty) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: [field.id],
          });
        }
      }
    }
  });
}
