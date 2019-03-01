import router from '@/router'
import { auth, ghProvider } from '@/config'

export default {
  state: {
    user: null,
    userData: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setUserData (state, payload) {
      state.userData = payload
    }
  },
  actions: {
    userSignUp ({ commit }, payload) {
      commit('setLoading', true)
      auth.createUserWithEmailAndPassword(payload.email, payload.password)
        .then(firebaseUser => {
          commit('setUser', { email: firebaseUser.user.email })
          commit('setLoading', false)
          router.push({ name: 'Home' })
        })
        .catch(error => {
          commit('setError', error.message)
          commit('setLoading', false)
        })
    },
    userSignInGithub ({ commit, dispatch }, payload) {
      commit('setLoading', true)
      auth.signInWithPopup(ghProvider)
        .then(firebaseUser => {
          if (firebaseUser.user) {
            commit('setUser', {
              id: firebaseUser.user.uid,
              uid: firebaseUser.user.uid,
              name: firebaseUser.user.displayName,
              email: firebaseUser.user.email
            })
            commit('setLoading', false)
            commit('setError', null)
            dispatch('getUserData', firebaseUser.user)
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
        commit('setUser', {
          id: payload.uid,
          uid: payload.uid,
          email: payload.email
        })
      }
    },
    userSignOut ({ commit }) {
      console.log('[routerPush]')
      auth.signOut()
      commit('setUser', null)
      commit('setUserData', null)
      router.push('/')
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    }
  }
}
