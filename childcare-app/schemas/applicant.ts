import { z } from 'zod'

export const applicantSchema = z.object({
  applicant_first_name: z.string().min(1, 'Required'),
  applicant_last_name: z.string().min(1, 'Required'),
  applicant_date_of_birth: z.string().min(1, 'Required'),
  marital_status: z.enum(['Single','Married','Divorced','Widowed','Separated']),
  assistance_reason_choice: z.array(z.enum(['Employment','Looking for Work','Vocational Training/Educational Activities','Receiving Domestic Violence Services','Homelessness'])).min(1).max(2)
})
