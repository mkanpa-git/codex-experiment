export function getError(obj: any, path: string) {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}
