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

  it('maps children, family members and income information', () => {
    const result = mapToSubmission({
      applicant_first_name: 'A',
      applicant_last_name: 'B',
      applicant_date_of_birth: '2000-01-01',
      marital_status: 'Married',
      children: [
        {
          child_first_name: 'Kid',
          child_last_name: 'One',
          child_mi: 'Q',
          child_relationship_to_applicant: 'Child',
          child_date_of_birth: '2020-01-01',
          child_sex: 'Male',
          child_ethnicity: 'Hispanic',
          child_race: ['AI'],
          child_ssn: '123-45-6789',
          do_both_parents_reside_in_home: 'Yes',
          has_disability: 'No',
          is_immigration_status_satisfactory: 'Yes',
        },
      ],
      familymember: [
        {
          family_member_first_name: 'Jane',
          family_member_last_name: 'Doe',
          family_member_mi: 'X',
          family_member_relationship_to_applicant: 'Spouse',
          family_member_date_of_birth: '1990-01-01',
          family_member_sex: 'Female',
          family_member_ethnicity: 'No',
          family_member_race: ['WH'],
          family_member_ssn: '987-65-4321',
        },
      ],
      income_source_entries: [
        {
          name_ref: 'ApplicantWages',
          other_source_text: null,
          is_source_applicable: 'Yes',
          gross_amount: 100,
          how_often: 'Weekly',
          recipient: 'Self',
          monthly_amount: 400,
        },
      ],
      total_income_value: 400,
    })

    expect(result.ChildrenNeedingCare).toEqual([
      {
        FirstName: 'Kid',
        LastName: 'One',
        MI: 'Q',
        RelationshipToApplicant: 'Child',
        DateOfBirth: '2020-01-01',
        Sex: 'Male',
        Ethnicity: 'Hispanic',
        Race: ['AI'],
        SSN: '123-45-6789',
        DoBothParentsResideInHome: 'Yes',
        HasDisability: 'No',
        IsImmigrationStatusSatisfactory: 'Yes',
      },
    ])
    expect(result.FamilyMembers).toEqual([
      {
        FirstName: 'Jane',
        LastName: 'Doe',
        MI: 'X',
        RelationshipToApplicant: 'Spouse',
        DateOfBirth: '1990-01-01',
        Sex: 'Female',
        Ethnicity: 'No',
        Race: ['WH'],
        SSN: '987-65-4321',
      },
    ])
    expect(result.IncomeInformation).toEqual({
      Sources: [
        {
          NameRef: 'ApplicantWages',
          OtherSourceText: null,
          IsSourceApplicable: 'Yes',
          GrossAmount: 100,
          HowOften: 'Weekly',
          Recipient: 'Self',
          MonthlyAmount: 400,
        },
      ],
      TotalIncome: 400,
    })
  })
})
