import { db, storage } from '@/config'

const resources = 'resources'

export default {
  state: {
    // likes: {},
    // favs: {}
  },
  mutations: {
    // likes (state, payload) {
    //   state.likes = payload
    // },
    // favs (state, payload) {
    //   state.favs = payload
    // }
  },
  actions: {
    removeFav ({ commit, state }, id) {
      db.doc(`${resources}/${id}/favs/${state.user.uid}`).delete()
    },
    removeLike ({ commit, state }, id) {
      db.doc(`${resources}/${id}/likes/${state.user.uid}`).delete()
    },
    createResource ({ commit }, payload) {
      return db.collection('resources').doc(payload.id).set(payload, { merge: true })
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
    // likes: (state) => (state.likes),
    // favs: (state) => (state.favs)
  }
}
