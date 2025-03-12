// firebaseConfig.js
import admin from "firebase-admin";
import serviceAccount from "./serviceKeys.json" assert { type: "json" };


if (!serviceAccount) {
  throw new Error("Firebase service account key is not provided");
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
