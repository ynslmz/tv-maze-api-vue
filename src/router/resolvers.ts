import { useShowStore } from '@/store/show'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export async function showsResolver(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  await useShowStore().fetchShows()
  next()
}

export async function showInfoResolver(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const store = useShowStore()
  if (!store.getShowDetail) await store.fetchShowById(String(to.params.id))
  // A missing show is a genuine not-found case — send the user there explicitly
  // rather than rendering an empty detail screen.
  if (!store.getShowDetail) return next('/notfound')
  next()
}
