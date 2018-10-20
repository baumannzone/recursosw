const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

function counterUpdate(change, column) {
  const commentsRef = change.after.ref.parent;
  const docRef = commentsRef.parent;//.child('comments_count');

  return commentsRef.get()
  .then(querySnapshot => {
    const commentsCount = querySnapshot.size
    const data = { [column]: commentsCount }
    return docRef.update(data)
  })
  .catch(err => console.log(err) )
}

// Keeps track of the length of the 'items' child list in a separate property.
exports.countResourceLikes = functions.firestore.document('/resources/{uid}/likes/{id}')
  .onWrite((change) => counterUpdate(change, 'likesCount'));
exports.countResourceFavs = functions.firestore.document('/resources/{uid}/favs/{id}')
  .onWrite((change) => counterUpdate(change, 'favsCount'));
// updateUserLikes
// updateUserFavs
