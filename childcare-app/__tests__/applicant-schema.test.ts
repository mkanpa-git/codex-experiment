import { applicantSchema } from '../schemas/applicant'
import { buildConditionalSchema } from '../utils/schemaBuilder'

describe('applicantSchema', () => {
  it('validates required fields', () => {
    const result = applicantSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it('rejects invalid marital status', () => {
    const result = applicantSchema.safeParse({
      applicant_first_name: 'A',
      applicant_last_name: 'B',
      applicant_date_of_birth: '2000-01-01',
      marital_status: 'Partnered',
      assistance_reason_choice: ['Employment']
    })
    expect(result.success).toBe(false)
  })

  it('enforces assistance reason count', () => {
    const result = applicantSchema.safeParse({
      applicant_first_name: 'A',
      applicant_last_name: 'B',
      applicant_date_of_birth: '2000-01-01',
      marital_status: 'Single',
      assistance_reason_choice: ['Employment', 'Homelessness', 'Looking for Work']
    })
    expect(result.success).toBe(false)
  })

  it('validates conditional fields inside groups', () => {
    const fields = [
      {
        id: 'children',
        type: 'group',
        metadata: { multiple: true },
        fields: [
          { id: 'name_ref', type: 'select' },
          {
            id: 'other_source_text',
            type: 'text',
            requiredCondition: { field: 'name_ref', operator: 'equals', value: 'Other' }
          }
        ]
      }
    ]

    const schema = buildConditionalSchema(fields)

    const missing = schema.safeParse({ children: [{ name_ref: 'Other' }] })
    expect(missing.success).toBe(false)
    if (!missing.success) {
      expect(missing.error.issues[0].path).toEqual(['children', 0, 'other_source_text'])
    }
    expect(schema.safeParse({ children: [{ name_ref: 'Other', other_source_text: 'foo' }] }).success).toBe(true)
    expect(schema.safeParse({ children: [{ name_ref: 'SelfEmployment' }] }).success).toBe(true)
  })

})
