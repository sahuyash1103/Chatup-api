const config = require("config");

const node_env = config.get("node_env") || process.env.NODE_ENV;
const port = config.get("port") || process.env.PORT;
const firebase_admin_key_path =
  config.get("firebase_admin_key_path") ||
  process.env.FIREBASE_ADMIN_KEY_PATH ||
  "../firebase-admin-key.json";

module.exports = {
  node_env,
  port,
  firebase_admin_key_path,
};
