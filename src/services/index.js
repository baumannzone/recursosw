import { db } from '../config'

const services = {
  /** List of resources order by date
   * Return resources
   * @returns {firebase.firestore.CollectionReference}
   */
  getResources (limit, search) {
    const ref = db.collection('resources').orderBy('createdAt', 'desc').limit(limit)
    if (search) ref.where('name', search)
    return ref
  }
}

export default services
