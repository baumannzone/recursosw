import { db } from '../config'

const services = {
  /** List of resources order by date
   * Return resources
   * @returns {firebase.firestore.CollectionReference}
   */
  getResources () {
    return db.collection('resources').orderBy('createdAt', 'desc')
  }
}

export default services
