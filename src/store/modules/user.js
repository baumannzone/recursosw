import { db } from '@/config'
import { firebaseMutations, firebaseAction } from 'vuexfire'

export default {
  strict: true,
  state: {
    user: null,
    users: null
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    getUserData: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, user) => {
      user.uid ? bindFirebaseRef('user', db.doc('users/' + user.uid)) : unbindFirebaseRef('user')
    }),
    users: firebaseAction(({ bindFirebaseRef }) => {
      bindFirebaseRef('users', db.collection('users'))
    }),
    updateUser ({ state }, { id, ...payload }) {
      state.users.doc(id).update(payload)
    }
  },
  getters: {
    getUserData: (state) => (state.user),
    likes: (state) => ((state.user || {}).likes || {}),
    favs: (state) => ((state.user || {}).favs || {}),
    admin: (state) => ((state.user || {}).roles || {}).admin
  }
}
