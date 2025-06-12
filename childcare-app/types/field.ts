export interface FieldSpec {
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
