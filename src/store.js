import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'
import router from '@/router'

firebase.initializeApp({
  apiKey: 'AIzaSyAx_xg8vnGH5cLeudjy-PkcX3oiLnKHT2I',
  authDomain: 'recursosw-cbe9e.firebaseapp.com',
  databaseURL: 'https://recursosw-cbe9e.firebaseio.com',
  projectId: 'recursosw-cbe9e',
  storageBucket: 'recursosw-cbe9e.appspot.com',
  messagingSenderId: '766701676434'
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appTitle: 'My Awesome App',
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          router.push('/home')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignIn ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.email })
          commit('setLoading', false)
          commit('setError', null)
          router.push('/home')
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignInGoogle ({ commit }, payload) {
      commit('setLoading', true)
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
        .then(firebaseUser => {
          console.log({ firebaseUser })
          if (firebaseUser.user) {
            commit('setUser', {
              name: firebaseUser.user.displayName,
              email: firebaseUser.user.email
            })
            commit('setLoading', false)
            commit('setError', null)
            router.push({ name: 'Home' })
          } else {
            throw new Error('Error credentials')
          }
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    autoSignIn ({ commit }, payload) {
      if (payload && payload.email) { commit('setUser', { email: payload.email }) }
    },
    userSignOut ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
      router.push('/')
    }
  },
  getters: {
    isAuthenticated (state) {
      console.log('{AUTH}', firebase.auth().currentUser)
      return state.user !== null && state.user !== undefined
    }
  }
})
