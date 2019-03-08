import * as admin from 'firebase-admin'

function onResourceCreated (snapshot, context) {
  console.log(":::::::ON RESOURCE CREATED::::::: ")
  console.log(snapshot)
  console.log(context)
  return 123456
}

export default onResourceCreated