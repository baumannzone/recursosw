import { db } from '../config'

const services = {
  /**
   * Return resources
   * @returns {firebase.firestore.CollectionReference}
   */
  getResources () {
    return db.collection('resources')
  }
}

export default services
