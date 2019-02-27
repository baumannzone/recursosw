import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { tmpdir } from 'os'
import { join, dirname } from 'path'
import * as sharp from 'sharp'
import * as fs from 'fs-extra'
import onSignUp from './onSignUp'
import * as algoliasearch from 'algoliasearch'
const env = functions.config()
const client = algoliasearch(env.algolia.appid, env.algolia.apikey)

admin.initializeApp()

const docs = {
  likesCount: 'likes',
  favsCount: 'favs'
}

function counterUpdate (change, column, context) {
  const childRef = change.after.ref
  const parentRef = childRef.parent
  const docRef = parentRef.parent
  const userId = context.params.id || change.before.id
  const parentId = context.params.uid
  const exists = change.after.exists ? true : admin.firestore.FieldValue.delete()
  const colName = docs[column]
  const updateCol = `${colName}.${parentId}`
  console.log({ userId, parentId }, { [updateCol]: exists })
  admin.firestore().doc(`/users/${userId}`).update({ [updateCol]: exists })
  .catch(error => console.log(error))
  return parentRef.get()
    .then(querySnapshot => {
      const commentsCount = querySnapshot.size
      const data = { [ column ]: commentsCount }
      return docRef.update(data)
    })
    .catch(error => console.log(error))
}

/**
 * uid = resource id,
 * id = user id
 * Cuando se haga like o dislike se ejecuta la funcion `counterUpdate`
 */
export const countResourceLikes = functions.firestore.document('/resources/{uid}/likes/{id}')
  .onWrite((change, context) => counterUpdate(change, 'likesCount', context))

export const countResourceFavs = functions.firestore.document('/resources/{uid}/favs/{id}')
  .onWrite((change, context) => counterUpdate(change, 'favsCount', context))

export const generateThumbs = functions.storage
  .object()
  .onFinalize(async object => {
    const bucket = admin.storage().bucket(object.bucket)
    // const bucket = gcs.bucket(object.bucket)
    const filePath = object.name
    const resourceId = filePath.split('/')[0]
    const fileName = filePath.split('/').pop()
    const bucketDir = dirname(filePath)

    const workingDir = join(tmpdir(), 'thumbs')
    const tmpFilePath = join(workingDir, `source${new Date().getTime()}.png`)

    // Controlar que solo se ejecute en un pàth determinado
    if (fileName.includes('thumb@') || !object.contentType.includes('image')) {
      console.log('exiting function')
      return false
    }

    // 1. Ensure thumbnail dir exists
    await fs.ensureDir(workingDir)

    // 2. Download Source File
    await bucket.file(filePath).download({
      destination: tmpFilePath
    })

    // 3. Resize the images and define an array of upload promises
    const sizes = [128, 256, 512]
    const thumbs: {} = {}
    const uploadPromises = sizes.map(async size => {
      const thumbName = `thumb@${size}_${fileName}`
      const thumbPath = join(workingDir, thumbName)

      // Resize source image
      await sharp(tmpFilePath)
        .resize(size, size)
        .toFile(thumbPath)

      const destination = join(bucketDir, thumbName)
      const imgUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/`
      + encodeURIComponent(destination)
      + '?alt=media&token='
      + object.metadata.firebaseStorageDownloadTokens

      thumbs[size] = imgUrl

      // Upload to GCS
      return bucket.upload(thumbPath, {
        destination: destination
      })
    })

    // 4. Run the upload operations
    await Promise.all(uploadPromises)

    // 5. Cleanup remove the tmp/thumbs from the filesystem
    fs.remove(workingDir)

    // 6. set thumbs to firestore
    if (filePath.split('/').length === 2) {
      admin.firestore().doc(`/resources/${resourceId}`)
        .set({ media: thumbs }, {merge: true})
        .catch(error => console.log({thumbs: error}))
    }
    return true
  })

const index = client.initIndex('resources_search')

exports.indexResource = functions.firestore
  .document('resources/{id}')
  .onCreate((snap, context) => {
    const data = snap.data()
    const objectID = snap.id

    // Add the data to the algolia index
    return index.addObject({
      objectID,
      ...data
    })
})

exports.unindexResource = functions.firestore
  .document('resources/{id}')
  .onDelete((snap, context) => {
    const objectId = snap.id

    // Delete an ID from the index
    return index.deleteObject(objectId)
})

export const onSignUpFunc = functions.auth.user().onCreate(onSignUp);
