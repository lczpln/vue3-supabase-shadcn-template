import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import { useAuthenticationStore } from '../stores/authentication'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresUnauth: true
      }
    },
    {
      path: '/create-account',
      name: 'create-account',
      component: () => import('../views/CreateAccountView.vue'),
      meta: {
        requiresUnauth: true
      }
    },
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authenticationStore = useAuthenticationStore()

  if (to.meta.requiresAuth && !authenticationStore.user) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresUnauth && authenticationStore.user) {
    return next({ name: 'dashboard' })
  }

  return next()
})

export default router
