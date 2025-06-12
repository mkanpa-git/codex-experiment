export type YesNo = 'Yes' | 'No'
export type Sex = 'Male' | 'Female' | 'X'
export type Ethnicity = 'Hispanic' | 'Latino' | 'No' | 'Prefer not to answer'
export type Race = 'AI' | 'AS' | 'BL' | 'HP' | 'WH'

export type ChildRelationship = 'Child' | 'Grandchild' | 'Foster Child' | 'Other'
export type FamilyRelationship =
  | 'Spouse'
  | 'Partner'
  | 'Foster Parent'
  | 'Child'
  | 'Other'

export type IncomeSourceName =
  | 'ApplicantWages'
  | 'SecondParentWages'
  | 'SelfEmployment'
  | 'ChildSupport'
  | 'Alimony'
  | 'Unemployment'
  | 'SocialSecurity'
  | 'Disability'
  | 'Rental'
  | 'Dividends'
  | 'Retirement'
  | 'CashAssistance'
  | 'Other'

export type IncomeFrequency = 'Weekly' | 'Bi-weekly' | 'Monthly' | 'Other'

export interface Child {
  LastName: string
  FirstName: string
  MI?: string | null
  RelationshipToApplicant: ChildRelationship
  DateOfBirth: string
  Sex: Sex
  Ethnicity?: Ethnicity
  Race?: Race[]
  SSN?: string
  DoBothParentsResideInHome: YesNo
  HasDisability: YesNo
  IsImmigrationStatusSatisfactory: YesNo
}

export interface FamilyMember {
  LastName: string
  FirstName: string
  MI?: string | null
  RelationshipToApplicant: FamilyRelationship
  DateOfBirth: string
  Sex: 'Male' | 'Female'
  Ethnicity?: Ethnicity
  Race?: Race[]
  SSN?: string
}

export interface IncomeSource {
  NameRef: IncomeSourceName
  OtherSourceText?: string | null
  IsSourceApplicable: YesNo
  GrossAmount: number
  HowOften: IncomeFrequency
  Recipient: string
  MonthlyAmount: number
}

export interface ApplicationSubmission {
  Applicant: {
    FirstName: string
    LastName: string
    DateOfBirth: string
    MaritalStatus: 'Single' | 'Married' | 'Divorced' | 'Widowed' | 'Separated'
  }
  ChildrenNeedingCare: Child[]
  FamilyMembers: FamilyMember[]
  IncomeInformation?: {
    Sources: IncomeSource[]
    TotalIncome: number
  }
  DocumentList: DocumentListEntry[]
}

export interface DocumentListEntry {
  proofCategory: string
  name: string
  fileType: string
  fileSize: number
}
