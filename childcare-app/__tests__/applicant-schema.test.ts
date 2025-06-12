import { applicantSchema } from '../schemas/applicant'

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

})
