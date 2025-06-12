export interface ApplicationSubmission {
  Applicant: {
    FirstName: string
    LastName: string
    DateOfBirth: string
    MaritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated'
  }
  ChildrenNeedingCare: any[]
  DocumentList: any[]
}
