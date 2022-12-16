const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
require("dotenv").config();

// const logger = require("./logger/logger");
const { node_env, port } = require("./utils/env_config");
const {
  initNotificationService,
} = require("./notification_service/notification_service");

const { storage } = require("./notification_service/firebaseAdmin");

const app = express();

let logger = console;

// ------------------------------------- INIT NOTIFICATION SERVICE
initNotificationService();

//---------------------------------------CORS OPTIONS
const corsOptions = {};
app.use(cors(corsOptions));

//----------------------MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

if (node_env === "development") {
  app.use(morgan("tiny"));
  logger.info("morgan is enabled");
}

// ---------------------------------------HOME ROUTE
app.get("/api", (req, res) => {
  res.send({ conected: true, message: "server is running well" });
});

app.get("/api/chats/images/:imgId", (req, res) => {
  let imageId = req.params.imgId;
  let body = req.body;
  let image = storage.bucket().file(`/chats/images/`);
});

// ---------------------------------------LISTNING TO CLIENTS
app.listen(port || 3001, () => logger.info(`server is listning....`));
