import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShowStore } from '@/store/show'

/**
 * Loads a single show for the detail screen, reacting to `:id` route changes
 * and redirecting to /notfound when the show cannot be loaded. Replaces the
 * old blocking `beforeEnter` resolver with non-blocking, colocated fetching.
 */
export function useShowData() {
  const store = useShowStore()
  const route = useRoute()
  const router = useRouter()

  const load = async (id: string) => {
    await store.fetchShowById(id)
    if (!store.show) router.replace('/notfound')
  }

  onMounted(() => load(String(route.params.id)))
  watch(
    () => route.params.id,
    (id) => id && load(String(id))
  )

  return store
}
