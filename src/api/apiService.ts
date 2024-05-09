import axios from 'axios'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

export function handleError(err: Error) {
  // Handle as you wish, push to sentry, log it, show a popup etc.
  // Or warn user there is something wrong but it's not you...
  console.log(`Axios Api Error ${err}`)
}

const Api = {
  get(url: string) {
    return client?.get(url).catch((err: Error) => handleError(err))
  }
}

export default Api
