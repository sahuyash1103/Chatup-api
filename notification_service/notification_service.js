const { fcm_notification } = require("./fcmNotificationHandler");
const { firestore } = require("./firebaseAdmin");
const { getUserData, isToday } = require("./utils");

let lastMessageTime = null;

function initNotificationService() {
  console.log("Notifiacation service is running...");
  firestore.collectionGroup("messages").onSnapshot((snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      message = change.doc.data();
      const timeStamp = new Date(message.timeStamp);

      if (!isToday(timeStamp)) {
        return;
      }

      if (lastMessageTime == message.timeStamp) {
        return;
      }

      lastMessageTime = message.timeStamp;
      let receiver = await getUserData(message.recieverId);
      let sender = await getUserData(message.senderId);

      const token = receiver.fcmToken;
      const title = sender.name;

      let body = message.text;
      if (body.length > 15) body = body.substring(0, 15) + "...";

      const data_body = {
        senderId: message.senderId,
        senderName: sender.name,
        senderProfilePic: sender.profilePic,
        messageType: message.type,
      };

      console.log()

      fcm_notification(token, title, body, data_body);
    });
  });
}

module.exports.initNotificationService = initNotificationService;
