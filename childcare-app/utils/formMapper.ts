import { ApplicationSubmission, DocumentListEntry } from '../types/openapi'

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

  return {
    Applicant: {
      FirstName: formData.applicant_first_name,
      LastName: formData.applicant_last_name,
      DateOfBirth: formData.applicant_date_of_birth,
      MaritalStatus: formData.marital_status,
    },
    ChildrenNeedingCare: [],
    DocumentList: docs,
  }
}
