import { describe, expect, it } from 'vitest'
import { isShow, parseSearchResults, parseShowList } from './validators'
import { getMockShow, getMockShowResults } from '@/utils/test-data.mock'

describe('validators', () => {
  describe('isShow', () => {
    it('accepts a well-formed show', () => {
      expect(isShow(getMockShow(1))).toBe(true)
    })

    it('rejects nullish and non-object values', () => {
      expect(isShow(null)).toBe(false)
      expect(isShow(undefined)).toBe(false)
      expect(isShow('show')).toBe(false)
    })

    it('rejects an object missing required fields', () => {
      expect(isShow({ id: 1 })).toBe(false)
      expect(isShow({ id: '1', name: 'x', genres: [], rating: {} })).toBe(false)
    })
  })

  describe('parseShowList', () => {
    it('drops malformed entries', () => {
      const input = [getMockShow(1), null, { id: 'bad' }, getMockShow(2)]
      expect(parseShowList(input).map((s) => s.id)).toEqual([1, 2])
    })

    it('returns an empty array for non-array input', () => {
      expect(parseShowList(undefined)).toEqual([])
      expect(parseShowList({})).toEqual([])
    })
  })

  describe('parseSearchResults', () => {
    it('keeps entries whose show is valid', () => {
      expect(parseSearchResults(getMockShowResults(3))).toHaveLength(3)
    })

    it('drops entries with an invalid show', () => {
      const input = [{ score: 1, show: { id: 'bad' } }, ...getMockShowResults(1)]
      expect(parseSearchResults(input)).toHaveLength(1)
    })
  })
})
