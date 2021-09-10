const admin = require("firebase-admin");
const serviceAccount = require("../../config.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
db = admin.firestore();

module.exports = { db }