export interface FieldSpec {
  id: string
  label?: string
  title?: string
  type: string
  required?: boolean
  requiredCondition?: any
  visibilityCondition?: any
  ui?: { options?: any; collapsible?: boolean; defaultCollapsed?: boolean }
  placeholder?: string
  content?: string
  metadata?: { multiple?: boolean; proofCategory?: string }
  constraints?: {
    allowedTypes?: string[]
    pattern?: string
    maxFileSizeMB?: number
    imageResolution?: {
      minWidth?: number
      minHeight?: number
    }
  }
  fields?: FieldSpec[]
}
