export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  runtime: number | null
  averageRuntime: number
  premiered: Date
  ended: Date | null
  officialSite: null | string
  schedule: Schedule
  rating: Rating
  weight: number
  network: Network | null
  webChannel: Network | null
  dvdCountry: Country | null
  externals: Externals
  image: Image
  summary: string
  updated: number
  _links: Links
  status: string
  _embedded: Embedded
}

export interface Links {
  self: Self
  previousepisode: Episode
  nextepisode?: Episode
}

export interface Self {
  href: string
}

export interface Externals {
  tvrage: number
  thetvdb: number | null
  imdb: null | string
}

export interface Image {
  medium: string
  original: string
}

export interface Network {
  id: number
  name: string
  country: Country | null
  officialSite: null | string
}

export interface Rating {
  average: number | null
}

export interface Schedule {
  time: string
  days: string[]
}

export interface Embedded {
  cast: Cast[]
  episodes: Episode[]
}

export interface Cast {
  person: Person
  character: Character
  self: boolean
  voice: boolean
}

export interface Character {
  id: number
  url: string
  name: string
  image: Image
  _links: CharacterLinks
}

export interface CharacterLinks {
  self: Self
}

export interface Person {
  id: number
  url: string
  name: string
  country: Country
  birthday: Date
  deathday: Date | null
  gender: string
  image: Image
  updated: number
  _links: CharacterLinks
}

export interface Country {
  name: string
  code: string
  timezone: string
}

export interface Episode {
  id: number
  url: string
  name: string
  season: number
  number: number
  type: string
  airdate: Date
  airtime: string
  airstamp: Date
  runtime: number
  rating: Rating
  image: Image
  summary: string
  _links: EpisodeLinks | null
}

export interface EpisodeLinks {
  self: Self
  show: Previousepisode
}

export interface Previousepisode {
  href: string
  name: string | string[]
}

export interface ShowSearchResult {
  score: number
  show: Show
}
