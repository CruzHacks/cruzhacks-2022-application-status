const admin = require("firebase-admin");
const serviceAccount = require("../../config.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

db = admin.firestore();
writeBatch = db.batch();

module.exports = { db, writeBatch };
