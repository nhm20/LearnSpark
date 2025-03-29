// firebaseConfig.js
import admin from "firebase-admin";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

// Get the current module's directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccount = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./serviceKeys.json"), "utf8")
);

if (!serviceAccount) {
  throw new Error("Firebase service account key is not provided");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;