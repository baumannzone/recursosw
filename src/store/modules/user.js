import { db } from '@/config'
import { firebaseMutations, firebaseAction } from 'vuexfire'
const usersRef = db.collection('users')
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
      bindFirebaseRef('users', usersRef)
    }),
    updateUser ({ state }, { id, ...payload }) {
      return usersRef.doc(id).set(payload, { merge: true })
    }
  },
  getters: {
    getUserData: (state) => (state.user),
    likes: (state) => ((state.user || {}).likes || {}),
    favs: (state) => ((state.user || {}).favs || {}),
    admin: (state) => ((state.user || {}).roles || {}).admin,
    editor: (state) => ((state.user || {}).roles || {}).editor
  }
}
