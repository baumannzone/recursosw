import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import firebase from 'firebase'
import VueFire from 'vuefire'
import 'firebase/firestore'
Vue.use(VueFire)

Vue.config.productionTip = false

let app
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      i18n,
      render: h => h(App),
      created () {
        store.dispatch('autoSignIn')
      }
    }).$mount('#app')
  }
  if (user) store.dispatch('getUserData', user)
})

export const db = firebase.firestore()
const settings = { timestampsInSnapshots: true }
db.settings(settings)
