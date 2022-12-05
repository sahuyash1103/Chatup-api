const admin = require("./firebaseAdmin").admin;
const messeging = admin.messeging;

function fcm_notification(token, title, body, data_body) {
  payload = {
    notification: {
      title: title,
      body: body,
    },
    data: data_body,
  };
  messeging.sendToDevice(token, payload).then((response) => {
    console.log(
      "Successfully sent message:",
      response,
      "\n\n********************************************************************\n\n"
    );
  });
}

module.exports.fcm_notification = fcm_notification;