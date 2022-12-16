const firebase_admin = require("firebase-admin");
const { firebase_admin_key_path } = require("../utils/env_config");
const firebaseAdminKey = require(firebase_admin_key_path);

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
