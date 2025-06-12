import { ApplicationSubmission } from '../types/openapi'

export function mapToSubmission(formData: Record<string, any>): ApplicationSubmission {
  return {
    Applicant: {
      FirstName: formData.applicant_first_name,
      LastName: formData.applicant_last_name,
      DateOfBirth: formData.applicant_date_of_birth,
      MaritalStatus: formData.marital_status,
    },
    ChildrenNeedingCare: [],
    DocumentList: [],
  }
}
