export interface Condition {
  field: string
  operator: 'equals' | 'includes'
  value: any
}
export function evaluateCondition(condition: Condition, data: Record<string, any>): boolean {
  const val = data[condition.field]
  if (condition.operator === 'equals') {
    return val === condition.value
  }
  if (condition.operator === 'includes') {
    return Array.isArray(val) && val.includes(condition.value)
  }
  return false
}
