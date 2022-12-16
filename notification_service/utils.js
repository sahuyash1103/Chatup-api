const { firestore } = require("./firebaseAdmin");

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

module.exports = {
  isToday,
  getUserData,
};
