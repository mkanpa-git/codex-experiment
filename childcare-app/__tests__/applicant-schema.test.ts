import { applicantSchema } from '../schemas/applicant'

describe('applicantSchema', () => {
  it('validates required fields', () => {
    const result = applicantSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})
