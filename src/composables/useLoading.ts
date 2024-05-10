import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useLoading() {
  console.log('useLoading')
  const router = useRouter()
  const isLoading = ref(false)
  router.beforeEach((to, from, next) => {
    isLoading.value = true
    next()
  })
  router.afterEach(() => {
    isLoading.value = false
  })
  return {
    isLoading
  }
}
