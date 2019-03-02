import { db } from '@/config'
import { firebaseMutations, firebaseAction } from 'vuexfire'

export default {
  strict: true,
  state: {
    user: null
  },
  mutations: {
    ...firebaseMutations
  },
  actions: {
    getUserData: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, user) => {
      user.uid ? bindFirebaseRef('user', db.doc('users/' + user.uid)) : unbindFirebaseRef('user')
    })
  },
  getters: {
    getUserData: (state) => (state.user),
    likes: (state) => ((state.user || {}).likes || {}),
    favs: (state) => ((state.user || {}).favs || {})
  }
}
