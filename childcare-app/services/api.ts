import type { ApplicationSubmission } from '../types/openapi'

export async function submitApplication(data: ApplicationSubmission) {
  const res = await fetch('/api/application', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('Submission failed')
  return res.json()
}
