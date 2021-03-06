import * as admin from 'firebase-admin'

function onSignUp (user, context) {
  admin.firestore().doc(`/users/${user.uid}`).set({
    id: user.uid,
    createdAt: new Date(),
    email: user.email || '',
    photoUrl: user.photoURL || '',
    displayName: user.displayName || user.email.split('@')[0] || 'Stranger',
    roles: {
      user: true
    },
  }, {merge: true})
  .catch(error => console.log({onSignUp: error}))
}

export default onSignUp