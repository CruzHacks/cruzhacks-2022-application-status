const admin = require('firebase-admin')
const serviceAccount = require('../../config.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const writeBatch = db.batch()

module.exports = { db, writeBatch }
