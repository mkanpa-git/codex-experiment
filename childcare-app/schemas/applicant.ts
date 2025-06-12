import { z } from 'zod'

export const applicantSchema = z.object({
  applicant_first_name: z.string().min(1, 'Required'),
  applicant_last_name: z.string().min(1, 'Required'),
  applicant_date_of_birth: z.string().min(1, 'Required'),
  marital_status: z.enum(['Single','Married','Divorced','Widowed','Separated'])
})
