import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const routerOptions = [
  // { path: '/', name: 'Home',component: 'Home', meta: { requiresAuth: true } },
  { path: '/', name: 'Home', component: 'Home' },
  { path: '/create', name: 'Create', component: 'Create' },
  { path: '/signin', name: 'Signin', component: 'Signin' },
  { path: '/signout', name: 'Signout', component: 'Signout' },
  { path: '/about', name: 'About', component: 'About' },
  { path: '/robinchon', name: 'Robinchon', component: 'Robinchon' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
  }
})

Vue.use(Router)

const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = store.getters.isAuthenticated
  if (requiresAuth && !isAuthenticated) {
    next('/signin')
  } else {
    next()
  }
})

export default router
