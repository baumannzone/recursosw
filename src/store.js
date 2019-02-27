import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

import { db, auth, ghProvider, storage } from './config'

Vue.use(Vuex)

const [ resources ] = [ 'resources' ]

export default new Vuex.Store({
  state: {
    userData: null,
    user: null,
    likes: {},
    favs: {},
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
    },
    setUserData (state, payload) {
      state.userData = payload
    },
    likes (state, payload) {
      state.likes = payload
    },
    favs (state, payload) {
      state.favs = payload
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
    },
    getUserData ({ commit, dispatch, state }, user) {
      if (user && user.uid) {
        return db.doc('users/' + user.uid).onSnapshot(
          (snapshot) => {
            if (!snapshot.exists) {
              const dataUser = {
                id: user.uid || user.id,
                displayName: user.displayName,
                likes: {},
                favs: {}
              }
              dispatch('updateUserData', dataUser)
              dispatch('setUserData', dataUser)
            } else {
              const data = { id: user.uid, ...snapshot.data() }
              data.likes = data.likes || {}
              data.favs = data.favs || {}
              if (data.likes) commit('likes', data.likes)
              if (data.favs) commit('favs', data.favs)
              commit('setUserData', data)
              return data
            }
          },
          () => {
            commit('setUserData', null)
            return { error: true }
          }
        )
      }
    },
    updateUserData ({ commit, state }, payload) {
      if (payload.likes) commit('likes', payload.likes)
      if (payload.favs) commit('favs', payload.favs)
      db.doc(`users/${state.user.uid || payload.id}`).set(payload, { merge: true })
    },
    setUserData ({ commit, state }, payload) {
      commit('setUserData', payload)
    },
    removeFav ({ commit, state }, id) {
      db.doc(`${resources}/${id}/favs/${state.user.uid}`).delete()
    },
    removeLike ({ commit, state }, id) {
      db.doc(`${resources}/${id}/likes/${state.user.uid}`).delete()
    },
    // createResource ({ commit }, payload) {
    //   return db.collection(resources).add(payload)
    // },
    createResource ({ commit }, { id, ...payload }) {
      return db.collection('resources').doc(id).set(payload, { merge: true })
    },
    createDocRef () {
      return db.collection(resources).doc()
    },
    uploadResourceImg ({ commit }, { id, file }) {
      return storage
        .ref(`${resources}/${id}/`)
        .child('mainImg')
        .put(file)
    },
    // uploadResourceImg ({ commit }, { id, img }) {
    //   return storage
    //     .ref(`${id}/`)
    //     .child('mainImg')
    //     .putString(img, 'data_url', { contentType: 'image/png' })
    // },
    updateResourceImg ({ commit }, { id, img }) {
      return db.collection(resources).doc(id)
        .update({
          'media.mainImg': img
        })
    },
    deleteResource ({ commit }, id) {
      return db.collection(resources).doc(id).delete()
    },
    favResource ({ commit, state }, id) {
      const userId = state.userData.id
      const data = { [userId]: true }
      return db.doc(`${resources}/${id}/favs/${userId}`).set(data)
    },
    likeResource ({ commit, state }, id) {
      const userId = state.userData.id
      const data = { [userId]: true }
      return db.doc(`${resources}/${id}/likes/${userId}`).set(data)
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null && state.user !== undefined
    },
    getUserData: (state) => (state.userData),
    likes: (state) => (state.likes),
    favs: (state) => (state.favs)
  }
})
