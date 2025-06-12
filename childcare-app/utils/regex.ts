export function sanitizePattern(str: string): string {
  if (!str) return str

  let pattern = str.trim()

  if (pattern.startsWith('/')) {
    const lastSlash = pattern.lastIndexOf('/')
    if (lastSlash > 0) {
      pattern = pattern.substring(1, lastSlash)
    } else {
      pattern = pattern.substring(1)
    }
  }

  if (pattern.endsWith('/')) {
    pattern = pattern.slice(0, -1)
  }

  pattern = pattern.replace(/\\([^dDwWsSbBfnrtv0xuU])/g, '\\\\$1')

  return pattern
}
