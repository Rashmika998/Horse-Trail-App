import firebase from "firebase/app";
import { db } from "../../firestore";

function getUserType(id) {
  return new Promise((resolve, reject) => {
    db.collection("users")
      .doc(id)
      .get()
      .then((type) => {
        resolve(type);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export default {
  getUserType,
};
