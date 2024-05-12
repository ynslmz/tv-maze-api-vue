import axios from 'axios'
import router from '../router'
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    /// I sent all errors to not found page, you can handle it as you wish here
    // Handle as you wish, push to sentry, log it, show a popup etc.
    // Or warn user there is something wrong but it's not you...
    router.push('/notfound')
    return Promise.reject(err)
  }
)

const Api = {
  get(url: string) {
    return client?.get(url)
  }
}

export default Api
