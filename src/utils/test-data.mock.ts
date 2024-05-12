import type { Image, Show } from '../types/show.type'

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

export function getMockShow(id = 1): Partial<Show> {
  return {
    id: id,
    url: 'https://www.example.com/show',
    name: 'Show Name',
    type: 'Scripted',
    language: 'English',
    genres: getMockGenres(id),
    status: 'Running',
    runtime: 60,
    premiered: new Date('2021-01-01'),
    officialSite: 'https://www.example.com',
    schedule: {
      time: '20:00',
      days: ['Monday']
    },
    rating: {
      average: Number((Math.random() * 10).toFixed(1))
    },
    weight: 100,
    network: {
      id: 1,
      officialSite: 'https://www.example.com',
      name: 'Network Name',
      country: {
        name: 'Country Name',
        code: 'Country Code',
        timezone: 'Country Timezone'
      }
    },
    webChannel: null,
    dvdCountry: null,
    externals: {
      tvrage: 1,
      thetvdb: 1,
      imdb: 'tt0000000'
    },
    image: {
      medium: 'medium.jpg',
      original: 'original.jpg'
    },
    summary: 'Show summary',
    updated: 1627679186,
    _embedded: {
      episodes: [],
      cast: []
    }
  }
}
