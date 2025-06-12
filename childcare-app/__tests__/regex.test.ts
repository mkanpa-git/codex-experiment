import { sanitizePattern } from '../utils/regex'
import { buildSchema } from '../utils/schemaBuilder'

describe('sanitizePattern', () => {
  it('trims delimiters', () => {
    expect(sanitizePattern('/^\\d{3}$/')).toBe('^\\d{3}$')
  })
  it('escapes unsupported escapes', () => {
    expect(sanitizePattern('foo\\z')).toBe('foo\\z')
  })
})

describe('buildSchema regex handling', () => {
  it('valid regex is applied', () => {
    const schema = buildSchema([{ id: 'a', type: 'text', constraints: { pattern: '/^\\d{3}$/' } }])
    expect(schema.safeParse({ a: '123' }).success).toBe(true)
    expect(schema.safeParse({ a: 'abc' }).success).toBe(false)
  })

  it('invalid regex logs warning and is skipped', () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {})
    const schema = buildSchema([{ id: 'a', type: 'text', constraints: { pattern: '/(unclosed/' } }])
    expect(schema.safeParse({ a: 'abc' }).success).toBe(true)
    expect(warn).toHaveBeenCalled()
    warn.mockRestore()
  })
})
