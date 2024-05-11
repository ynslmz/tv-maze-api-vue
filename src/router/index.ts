import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { showDetailResolver, showsResolver } from './resolvers'

const router = createRouter({
  history: createWebHistory(),
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
      beforeEnter: showDetailResolver,
      children: [
        {
          path: '',
          name: 'main',
          component: () => import('../views/detail/MainView.vue')
        },
        {
          path: 'cast',
          name: 'cast',
          component: () => import('../views/detail/CastView.vue')
        },
        {
          path: 'episodes',
          name: 'episodes',
          component: () => import('../views/detail/EpisodesView.vue')
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../views/NotFoundView.vue')
    }
  ]
})

export default router
