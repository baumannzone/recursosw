import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import fbSetttings from './firebase'

const firebaseApp = firebase.initializeApp(fbSetttings)

export const auth = firebaseApp.auth()
export const db = firebaseApp.firestore()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
