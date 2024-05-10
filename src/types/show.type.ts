export interface Show {
  id: number
  url: string
  name: string
  type: string
  language: string
  genres: string[]
  status: Status
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
}

export interface Links {
  self: Self
  previousepisode: Episode
  nextepisode?: Episode
}

export interface Episode {
  href: string
  name: string
}

export interface Self {
  href: string
}

export interface Country {
  name: string
  code: string
  timezone: string
}

export interface Externals {
  tvrage: number
  thetvdb: number | null
  imdb: null | string
}

// export enum Genre {
//   Action = 'Action',
//   Adventure = 'Adventure',
//   Anime = 'Anime',
//   Comedy = 'Comedy',
//   Crime = 'Crime',
//   Drama = 'Drama',
//   Espionage = 'Espionage',
//   Family = 'Family',
//   Fantasy = 'Fantasy',
//   History = 'History',
//   Horror = 'Horror',
//   Legal = 'Legal',
//   Medical = 'Medical',
//   Music = 'Music',
//   Mystery = 'Mystery',
//   Romance = 'Romance',
//   ScienceFiction = 'Science-Fiction',
//   Sports = 'Sports',
//   Supernatural = 'Supernatural',
//   Thriller = 'Thriller',
//   War = 'War',
//   Western = 'Western'
// }

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

export enum Status {
  Ended = 'Ended',
  Running = 'Running',
  ToBeDetermined = 'To Be Determined'
}
