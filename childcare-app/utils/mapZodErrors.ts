/**
 * Recursively converts Zod's flattened fieldErrors object into the
 * shape expected by react-hook-form. Strings are wrapped in an object
 * `{ message: string }` and nested arrays are traversed so that group
 * fields return arrays of objects with the same structure.
 */
export default function mapZodErrors(errors: any): any {
  if (Array.isArray(errors)) {
    // Array of error messages for primitive fields
    if (errors.length > 0 && typeof errors[0] === 'string') {
      return { message: errors[0] }
    }
    // Array of nested objects, e.g. groups with `multiple: true`
    return errors.map(e => mapZodErrors(e))
  }
  if (errors && typeof errors === 'object') {
    const out: Record<string, any> = {}
    for (const [key, value] of Object.entries(errors)) {
      out[key] = mapZodErrors(value)
    }
    return out
  }
  if (typeof errors === 'string') {
    return { message: errors }
  }
  return errors
}
