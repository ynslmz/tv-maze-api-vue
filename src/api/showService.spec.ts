import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('./apiService', () => ({ default: { get: vi.fn() } }))

import Api from './apiService'
import { ShowService } from './showService'

describe('ShowService', () => {
  beforeEach(() => vi.clearAllMocks())

  describe('getShows', () => {
    it('requests the index without a page param for page 1', () => {
      ShowService.getShows(1)
      expect(Api.get).toHaveBeenCalledWith('/shows')
    })

    it('appends the page param for later pages', () => {
      ShowService.getShows(3)
      expect(Api.get).toHaveBeenCalledWith('/shows?page=3')
    })
  })

  it('embeds cast and episodes when fetching a show by id', () => {
    ShowService.getShowById('204')
    expect(Api.get).toHaveBeenCalledWith('/shows/204?embed[]=cast&embed[]=episodes')
  })

  describe('searchShows', () => {
    it('encodes the query string', () => {
      ShowService.searchShows('the office & more')
      expect(Api.get).toHaveBeenCalledWith('/search/shows?q=the%20office%20%26%20more')
    })
  })
})
