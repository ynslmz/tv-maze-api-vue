import { createRouter, createWebHashHistory } from 'vue-router'
import { showInfoResolver, showsResolver } from './resolvers'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: DashboardView,
      beforeEnter: showsResolver /// to wait to fetch shows data before entering the route
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/DetailView.vue'),
      children: [
        {
          path: '',
          name: 'Info',
          beforeEnter: showInfoResolver,
          component: () => import('../views/detail/MainView.vue')
        },
        {
          path: 'cast',
          name: 'Cast',
          component: () => import('../views/detail/CastView.vue')
        },
        {
          path: 'episodes',
          name: 'Episodes',
          component: () => import('../views/detail/EpisodesView.vue')
        }
      ]
    },
    {
      path: '/notfound',
      name: 'notfound',
      component: () => import('../views/NotFoundView.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
