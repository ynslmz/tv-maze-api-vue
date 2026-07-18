import axios from 'axios'

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

// Errors are intentionally NOT handled globally here. A failed request should
// not eject the user from the whole app (e.g. a failed search must not navigate
// away). Callers (the store actions) catch errors and decide how to surface
// them — inline error state, or an explicit /notfound for a missing resource.
client.interceptors.response.use(
  (res) => res,
  (err) => Promise.reject(err)
)

const Api = {
  get(url: string) {
    return client.get(url)
  }
}

export default Api
