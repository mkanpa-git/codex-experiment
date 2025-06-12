# Field Mapping Guide

This document maps the form field identifiers in `childcare_form.json` to their
corresponding locations in the `ApplicationSubmission` payload as defined in
`openapi.yaml`.

| Form Field ID | API Path |
|---------------|---------|
| `applicant_first_name` | `ApplicationSubmission.Applicant.FirstName` |
| `applicant_last_name`  | `ApplicationSubmission.Applicant.LastName` |
| `applicant_date_of_birth` | `ApplicationSubmission.Applicant.DateOfBirth` |
| `marital_status` | `ApplicationSubmission.Applicant.MaritalStatus` |
| `child_first_name` | `ApplicationSubmission.ChildrenNeedingCare[].FirstName` |
| `child_last_name` | `ApplicationSubmission.ChildrenNeedingCare[].LastName` |
| `child_date_of_birth` | `ApplicationSubmission.ChildrenNeedingCare[].DateOfBirth` |
| `family_member_first_name` | `ApplicationSubmission.FamilyMembers[].FirstName` |
| `family_member_last_name` | `ApplicationSubmission.FamilyMembers[].LastName` |
| `income_proof` | `ApplicationSubmission.DocumentList[]` (proofCategory=`Income Verification`) |

This table is not exhaustive but provides guidance on how form inputs are
translated when constructing the payload for submission. Ensure that enumerated
values (e.g., marital status or assistance reasons) match those listed in the
API specification.
