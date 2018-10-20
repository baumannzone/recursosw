import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const routerOptions = [
  // { path: '/', name: 'Home',component: 'Home', meta: { requiresAuth: true } },
  { path: '/', name: 'Home', component: 'Home' },
  { path: '/signin', name: 'Signin', component: 'Signin' },
  { path: '/about', name: 'About', component: 'About' }
  // { path: '*', name: 'NotFound', component: 'NotFound' }
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
    // this.$store.dispatch('aut')
    next('/signin')
  } else {
    next()
  }
})

export default router
