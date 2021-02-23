import * as firebase from "firebase";

import firebaseConfig from "./firebaseConfig";

// Initialize firebase...
if (firebase.apps && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
