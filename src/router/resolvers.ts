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
