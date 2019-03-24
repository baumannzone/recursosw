import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import resource from './modules/resource'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    user,
    resource
  },
  state: {
    error: null,
    loading: false
  },
  mutations: {
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {

  },
  getters: {

  }
})

export default store
