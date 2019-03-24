import { db } from '../config'

const services = {
  /** List of resources order by date
   * Return resources
   * @returns {firebase.firestore.CollectionReference}
   */
  getResources (limit, tag) {
    console.log('getResources', limit, tag)
    const ref = db.collection('resources')
      .where('status', '==', 'approved')
      .orderBy('id', 'desc')
      .limit(limit)
    if (tag) return ref.where('tags', 'array-contains', tag)
    return ref
  },
  getResourcesByTag (limit, tag) {
    return db.collection('resources')
      .where('tags', 'array-contains', tag)
      .orderBy('createdAt', 'desc')
      .limit(limit)
  },
  /**
   * Update one role at time `admin`, `user` or `editor`
   * @param {String} id
   * @param {Object} data
   */
  updateUserRole ({ id, ...data }) {
    console.log(data)
    return db.collection('users').doc(id)
      .set(data, { merge: true })
  }
}

export default services
