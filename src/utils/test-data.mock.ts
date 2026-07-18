import type { Image, Show, ShowSearchResult } from '../types/show.type'

export function getMockImage(): Image {
  return { medium: 'medium.jpg', original: 'original.jpg' }
}

// Deterministic fixtures: test data must be reproducible, so values are
// derived from the id rather than Math.random().
function getMockGenres(id: number): string[] {
  const pool = ['Drama', 'Comedy', 'Action', 'Sports', 'Family']
  return [...new Set([pool[id % pool.length], pool[(id + 2) % pool.length]])]
}

function getMockScore(id = 1): number {
  return Number((0.5 + (id % 5) / 10).toFixed(2))
}

function getMockRating(id = 1): number {
  return Number((5 + (id % 5)).toFixed(1))
}

export function getMockShow(id = 1): Show {
  return {
    id: id,
    url: 'https://www.tvmaze.com/shows/204/show-name-' + id,
    name: `Show Name ${id}`,
    type: 'Scripted',
    language: 'English',
    genres: getMockGenres(id),
    status: 'Ended',
    runtime: 60,
    averageRuntime: 60,
    premiered: '1997-07-27',
    ended: id % 2 === 0 ? '2007-06-22' : null,
    officialSite: 'http://officialSite.com/view/series/1/index.html',
    schedule: {
      time: '20:00',
      days: ['Friday']
    },
    rating: {
      average: getMockRating(id)
    },
    weight: 99,
    network: {
      id: 16,
      name: 'Syfy',
      country: {
        name: 'United States',
        code: 'US',
        timezone: 'America/New_York'
      },
      officialSite: null
    },
    webChannel: null,
    dvdCountry: null,
    externals: {
      tvrage: 5325,
      thetvdb: 72449,
      imdb: 'tt0118480'
    },
    image: {
      medium: 'https://static.tvmaze.com/uploads/images/medium_portrait/1/3027.jpg',
      original: 'https://static.tvmaze.com/uploads/images/original_untouched/1/3027.jpg'
    },
    summary:
      "<p><b>Stargate SG-1</b> is a science fiction series based on the original film <i>Stargate</i>. It involves the team SG-1 going on various adventures to different alien worlds through Stargates. Throughout the series they encounter various alien threats and allies including but not limited to the Goa'uld and the Asgard.</p>",
    updated: 1704794513,
    _links: {
      self: {
        href: 'https://api.tvmaze.com/shows/204'
      }
    },
    _embedded: {
      episodes: [],
      cast: []
    }
  }
}

export function getMockShowResults(count = 10): ShowSearchResult[] {
  return Array.from({ length: count }, (_, i) => ({
    show: getMockShow(i + 1),
    score: getMockScore(i + 1)
  }))
}
