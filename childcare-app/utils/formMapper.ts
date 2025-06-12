import {
  ApplicationSubmission,
  DocumentListEntry,
  Child,
  FamilyMember,
  IncomeSource,
} from '../types/openapi'

interface FileFieldConfig {
  proofCategory: string
  multiple: boolean
}

const FILE_FIELD_CONFIG: Record<string, FileFieldConfig> = {
  income_proof: { proofCategory: 'Income Verification', multiple: true },
  nyc_residency_file: { proofCategory: 'NYC Residency', multiple: false },
  citizenship_doc_file: { proofCategory: 'Citizenship/Immigration Status', multiple: false },
  relationship_doc_file: { proofCategory: 'Child Relationship', multiple: false },
  age_doc_file: { proofCategory: 'Child Age', multiple: false }
}

export function mapToSubmission(formData: Record<string, any>): ApplicationSubmission {
  const docs: DocumentListEntry[] = []
  for (const [fieldId, config] of Object.entries(FILE_FIELD_CONFIG)) {
    const value = formData[fieldId]
    if (!value) continue

    const files: File[] = []
    if (value instanceof FileList) {
      files.push(...Array.from(value))
    } else if (Array.isArray(value)) {
      for (const f of value) {
        if (f instanceof File) files.push(f)
      }
    } else if (value instanceof File) {
      files.push(value)
    }

    for (const file of files) {
      docs.push({
        proofCategory: config.proofCategory,
        name: file.name,
        fileType: file.type,
        fileSize: file.size,
      })
    }
  }

  const children: Child[] = []
  if (Array.isArray(formData.children)) {
    for (const c of formData.children) {
      children.push({
        FirstName: c.child_first_name,
        LastName: c.child_last_name,
        MI: c.child_mi ?? null,
        RelationshipToApplicant: c.child_relationship_to_applicant,
        DateOfBirth: c.child_date_of_birth,
        Sex: c.child_sex,
        Ethnicity: c.child_ethnicity,
        Race: c.child_race,
        SSN: c.child_ssn,
        DoBothParentsResideInHome: c.do_both_parents_reside_in_home,
        HasDisability: c.has_disability,
        IsImmigrationStatusSatisfactory: c.is_immigration_status_satisfactory,
      })
    }
  }

  const familyMembers: FamilyMember[] = []
  if (Array.isArray(formData.familymember)) {
    for (const m of formData.familymember) {
      familyMembers.push({
        FirstName: m.family_member_first_name,
        LastName: m.family_member_last_name,
        MI: m.family_member_mi ?? null,
        RelationshipToApplicant: m.family_member_relationship_to_applicant,
        DateOfBirth: m.family_member_date_of_birth,
        Sex: m.family_member_sex,
        Ethnicity: m.family_member_ethnicity,
        Race: m.family_member_race,
        SSN: m.family_member_ssn,
      })
    }
  }

  const incomeSources: IncomeSource[] = []
  if (Array.isArray(formData.income_source_entries)) {
    for (const src of formData.income_source_entries) {
      incomeSources.push({
        NameRef: src.name_ref,
        OtherSourceText: src.other_source_text ?? null,
        IsSourceApplicable: src.is_source_applicable,
        GrossAmount: src.gross_amount,
        HowOften: src.how_often,
        Recipient: src.recipient,
        MonthlyAmount: src.monthly_amount,
      })
    }
  }

  const submission: ApplicationSubmission = {
    Applicant: {
      FirstName: formData.applicant_first_name,
      LastName: formData.applicant_last_name,
      DateOfBirth: formData.applicant_date_of_birth,
      MaritalStatus: formData.marital_status,
    },
    ChildrenNeedingCare: children,
    FamilyMembers: familyMembers,
    DocumentList: docs,
  }

  if (incomeSources.length || formData.total_income_value !== undefined) {
    submission.IncomeInformation = {
      Sources: incomeSources,
      TotalIncome: formData.total_income_value,
    }
  }

  return submission
}
