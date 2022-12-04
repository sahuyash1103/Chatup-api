const firebase_admin = require("firebase-admin");
const firebaseAdminKey = require("./firebase-admin-key.json");

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert(firebaseAdminKey),
  databaseURL: `https://${firebaseAdminKey.project_id}.firebaseio.com`,
});

let firestore = firebase_admin.firestore();
let messeging = firebase_admin.messaging();
let storage = firebase_admin.storage();

let lastPayload = {};

firestore.collectionGroup("messages").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach(async (change) => {
    let receiver = await getUserData(change.doc.data().recieverId);
    let sender = await getUserData(change.doc.data().senderId);
    const token = receiver.fcmToken;
    const title = sender.name;
    let body = change.doc.data().text;
    if (body.length > 15) body = body.substring(0, 15) + "...";

    const data_body = {
      sender: {
        senderId: change.doc.data().senderId,
        senderName: sender.name,
        senderProfilePic: sender.profilePic,
      },
      messageType: change.doc.data().type,
    };

    fcm_notification(token, title, body, data_body);
  });
});

function fcm_notification(token, title, body, data_body) {
  payload = {
    notification: {
      title: title,
      body: body,
    },
    data: data_body,
  };
  if (JSON.stringify(lastPayload) === JSON.stringify(payload)) {
    console.log("Same Payload");
    return;
  }
  lastPayload = payload;
  messeging.sendToDevice(token, payload).then((response) => {
    console.log(
      "Successfully sent message:",
      response,
      "\nwith payload:",
      payload
    );
  });
}

async function getUserData(uid) {
  return (await firestore.collection("users").doc(uid).get()).data();
}
