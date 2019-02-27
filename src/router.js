import Vue from 'vue'
import Router from 'vue-router'
import store from './store'

const routerOptions = [
  { path: '/', name: 'Home', component: 'Home' },
  { path: '/resources/:id', name: 'Resource', component: 'Resource' },
  { path: '/tags/:tag', name: 'Tag', component: 'Tag' },
  { path: '/create', name: 'Create', component: 'Create', meta: { requiresAuth: true } },
  { path: '/admin', name: 'Admin', component: 'Admin', meta: { requiresAuth: true } },
  { path: '/signout', name: 'Signout', component: 'Signout' },
  { path: '/signin', name: 'Signin', component: 'Signin' },
  { path: '*', name: 'NotFound', component: 'NotFound' }
]

const routes = routerOptions.map(route => {
  return {
    ...route,
    component: () => import(`@/views/${route.component}.vue`)
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
    console.log('U NEED LOGIN ☝️!')
    next('/signin')
  } else {
    next()
  }
})

export default router
