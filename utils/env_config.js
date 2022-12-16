const config = require("config");

const node_env = config.get("node_env") || process.env.NODE_ENV;
const port = config.get("port") || process.env.PORT;

module.exports = {
  node_env,
  port,
};
