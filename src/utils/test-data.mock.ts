import type { Image, Show, ShowSearchResult } from '../types/show.type'

export function getMockImage(): Image {
  return { medium: 'medium.jpg', original: 'original.jpg' }
}

function getMockGenres(id: number): string[] {
  const genres = new Set<string>()
  for (let i = 0; i < 4; i++) {
    genres.add(`Genre ${(id * Math.round(Math.random() * 10)) % 5}`)
  }
  return [...genres]
}

function getMockScore() {
  return Number(Math.random().toFixed(2))
}

function getMockRating(): number {
  return Number((Math.random() * 10).toFixed(1))
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
    premiered: new Date('1997-07-27'),
    ended: id % 2 === 0 ? new Date('2007-06-22') : null,
    officialSite: 'http://officialSite.com/view/series/1/index.html',
    schedule: {
      time: '20:00',
      days: ['Friday']
    },
    rating: {
      average: getMockRating()
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
      },
      previousepisode: {} as any,
      nextepisode: {} as any
    },
    _embedded: {
      episodes: [] as any,
      cast: [] as any
    }
  }
}

export function getMockShowResults(count = 10): ShowSearchResult[] {
  return Array.from({ length: count }, (_, i) => ({
    show: getMockShow(i + 1),
    score: getMockScore()
  }))
}
