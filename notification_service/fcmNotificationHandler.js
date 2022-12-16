const { messeging } = require("./firebaseAdmin");

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
      "\n\n********************************************************************\n\n",
      "Successfully sent Notification:",
      response,
      "\n\n********************************************************************\n\n"
    );
  });
}

module.exports.fcm_notification = fcm_notification;
