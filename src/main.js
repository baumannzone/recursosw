// import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import firebase from 'firebase'
import VueFire from 'vuefire'

Vue.config.productionTip = false
Vue.use(VueFire)

// new Vue({
//   router,
//   store,
//   i18n,
//   render: h => h(App)
// }).$mount('#app')

const unsubscribe = firebase.auth().onAuthStateChanged(user => {
  new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    created () {
      if (user) store.dispatch('autoSignIn', user)
    }
  }).$mount('#app')
  if (user) store.dispatch('getUserData', user)
  unsubscribe()
})
