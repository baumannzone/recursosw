import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import { db, auth, googleProvider } from './config'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userData: null,
    user: null,
    likes: {},
    favs: {},
    error: null,
    loading: false,
    resources: []
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
    },
    setUserData (state, payload) {
      state.userData = payload
    },
    likes (state, payload) {
      state.likes = payload
    },
    favs (state, payload) {
      state.favs = payload
    },
    setResources (state, payload) {
      state.resources = payload
    }
  },
  actions: {
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
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
      auth.signInWithEmailAndPassword(payload.email, payload.password)
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
      auth.signInWithPopup(googleProvider)
        .then(firebaseUser => {
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
      if (payload && payload.email) {
        commit('setUser', { email: payload.email })
      }
    },
    userSignOut ({ commit }) {
      auth.signOut()
      commit('setUser', null)
      router.push('/')
    },
    getUserData ({ commit, state }, user) {
      if (user && user.uid) {
        db.doc('users/' + user.uid).get()
          .then(snapshot => {
            const data = { id: snapshot.id, ...snapshot.data() }
            data.likes = data.likes || {}
            data.favs = data.favs || {}
            if (data.likes) commit('likes', data.likes)
            if (data.favs) commit('favs', data.favs)
            // console.log({ userData: data })
            return data
          })
          .then(data => commit('setUserData', data))
          .catch(() => commit('setUserData', null))
      }
    },
    updateUserData ({ commit, state }, payload) {
      console.log('commit likes -->', payload.likes)
      if (payload.likes) commit('likes', payload.likes)
      if (payload.favs) commit('favs', payload.favs)
      db.doc('users/' + state.userData.id).update(payload)
    },
    getResources ({ commit }) {
      const resources = []
      db.collection('resources')
        .onSnapshot((doc) => {
          doc.forEach((doc) => {
            resources.push({
              id: doc.id,
              ...doc.data()
            })
          })
          commit('setResources', resources)
        })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    getUserData: (state) => (state.userData),
    likes: (state) => (state.likes),
    favs: (state) => (state.favs),
    resources: (state) => (state.resources)
  }
})
