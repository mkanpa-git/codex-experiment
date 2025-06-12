import { mapToSubmission } from '../utils/formMapper'

// jsdom provides a File constructor

describe('mapToSubmission', () => {
  it('maps uploaded files to DocumentList entries', () => {
    const file = new File(['dummy'], 'proof.pdf', { type: 'application/pdf' })
    const result = mapToSubmission({
      applicant_first_name: 'A',
      applicant_last_name: 'B',
      applicant_date_of_birth: '2000-01-01',
      marital_status: 'Single',
      income_proof: [file]
    })
    expect(result.DocumentList.length).toBe(1)
    expect(result.DocumentList[0]).toEqual({
      proofCategory: 'Income Verification',
      name: 'proof.pdf',
      fileType: 'application/pdf',
      fileSize: file.size
    })
  })
})
