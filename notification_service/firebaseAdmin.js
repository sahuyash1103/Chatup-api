const firebase_admin = require("firebase-admin");
const firebaseAdminKey = require("../firebase-admin-key.json");

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(firebaseAdminKey),
  databaseURL: `https://${firebaseAdminKey.project_id}.firebaseio.com`,
});

let firestore = firebase_admin.firestore();
let messeging = firebase_admin.messaging();
let storage = firebase_admin.storage();

module.exports = {
  firestore,
  messeging,
  storage,
};
