import { onMounted } from 'vue'
import { useShowStore } from '@/store/show'

/**
 * Loads the show index for the dashboard on mount. The store's cache guard
 * skips the request when the list is already present, so this is cheap to call.
 */
export function useShowsData() {
  const store = useShowStore()
  onMounted(() => store.fetchShows())
  return store
}
