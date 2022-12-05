const admin = require("./firebaseAdmin");

const firestore = admin.admin.firestore;

function isToday(date) {
  const today = new Date();

  if (today.toDateString() === date.toDateString()) {
    return true;
  }

  return false;
}

async function getUserData(uid) {
  return (await firestore.collection("users").doc(uid).get()).data();
}

module.exports.utils = {
  isToday,
  getUserData,
};
