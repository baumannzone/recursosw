import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const routerOptions = [
  { path: '/', name: 'Home', componentPath: 'Home' },
  { path: '/resources/:id', name: 'Resource', componentPath: 'Resource' },
  { path: '/tags/:tag', name: 'Tag', componentPath: 'Tag' },
  { path: '/create', name: 'Create', componentPath: 'Create', meta: { requiresAuth: true } },
  { path: '/admin', name: 'Admin', componentPath: 'Admin', meta: { requiresAuth: true } },
  { path: '/signin', name: 'SignIn', componentPath: 'SignIn' },
  { path: '/signout', name: 'SignOut', componentPath: 'SignOut' },
  { path: '*', name: 'NotFound', componentPath: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.componentPath}/Index.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters.isAuthenticated
  if (requiresAuth && !isAuthenticated) {
    console.log('U NEED LOGIN ☝️!', to)
    const query = to.path.length > 2 ? { from: to.path } : null
    next({ path: '/signin', query })
  } else {
    next()
  }
})

export default router
