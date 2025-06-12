export interface ApplicationSubmission {
  Applicant: {
    FirstName: string
    LastName: string
    DateOfBirth: string
    MaritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated'
  }
  ChildrenNeedingCare: any[]
  DocumentList: DocumentListEntry[]
}

export interface DocumentListEntry {
  proofCategory: string
  name: string
  fileType: string
  fileSize: number
}
