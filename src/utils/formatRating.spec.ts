import { describe, expect, it } from 'vitest'
import { formatRating } from './formatRating'

describe('formatRating', () => {
  it('formats a rating to one decimal place with a star', () => {
    expect(formatRating(8)).toBe('8.0 ⭐️')
    expect(formatRating(7.45)).toBe('7.5 ⭐️')
  })

  it('returns an empty string for a missing rating', () => {
    expect(formatRating(null)).toBe('')
    expect(formatRating(undefined)).toBe('')
  })

  it('formats a zero rating rather than treating it as missing', () => {
    expect(formatRating(0)).toBe('0.0 ⭐️')
  })
})
