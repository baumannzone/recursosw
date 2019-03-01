import { db } from '@/config'

const users = 'users'

export default {
  state: {
    likes: {},
    favs: {}
  },
  mutations: {

  },
  actions: {
    getUserData ({ commit, dispatch, state }, user) {
      if (user && user.uid) {
        return db.doc(`${users}/${user.uid}`).onSnapshot(
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
      db.doc(`${users}/${state.user.uid || payload.id}`).set(payload, { merge: true })
    },
    setUserData ({ commit, state }, payload) {
      commit('setUserData', payload)
    }
  },
  getters: {
    getUserData: (state) => (state.userData)
  }
}
