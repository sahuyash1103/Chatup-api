const config = require("config");

const node_env = config.get("node_env") || process.env.NODE_ENV;
const port = config.get("port") || process.env.PORT;
let firebaseAdminKey = null;

if (config.get("firebase_admin_key")) {
  firebaseAdminKey = JSON.parse(config.get("firebase_admin_key"));
} else if (process.env.FIREBASE_ADMIN_KEY) {
  firebaseAdminKey = JSON.parse(process.env.FIREBASE_ADMIN_KEY);
} else {
  firebaseAdminKey = require("../firebase-admin-key.json");
}

module.exports = {
  node_env,
  port,
  firebaseAdminKey,
};
