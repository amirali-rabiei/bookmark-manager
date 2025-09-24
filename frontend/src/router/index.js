import { createRouter, createWebHistory } from 'vue-router'
import NavigationBar from '@/components/NavigationBar.vue'
import Home from '@/views/Home.vue'
import { useUser } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      component: NavigationBar,
      children: [
        {
          path: '/add',
          name: 'add',
          component: () => import('@/components/NewBookMark.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/AddCategory',
          name: 'AddCategory',
          component: () => import('@/components/AddCategory.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/categories',
          name: 'categories',
          component: () => import('@/components/Categories.vue'),
          meta: { requiresAuth: true },

        },
        {
          path: '/categories/:category',
          name: 'category',
          component: () => import('@/components/category.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/frequent',
          name: 'frequent',
          component: () => import('@/components/Frequent.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/settings',
          name: 'settings',
          component: () => import('@/views/settings.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/home',
          name: 'home',
          component: Home,
          meta: { requiresAuth: true }
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import('@/components/Profile.vue'),
          meta: { requiresAuth: true },
        },
        {
          path: '/bookmark/:id',
          name: 'bookmark',
          component: () => import('@/components/Bookmark.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('@/components/Register.vue')
        },
        {
          path: '/login',
          name: 'login',
          component: () => import('@/components/Login.vue')
        }
      ]
    },

  ],
})


router.beforeEach(async (to, from, next) => {
  const userStore = useUser()
  try {
    await userStore.fetchUserInfo()


    if (to.meta.requiresAuth && !userStore.isAuth) {
      return next({ name: 'login' })
    }

    return next()

  } catch (error) {
    console.log(error)
  }
})

export default router
