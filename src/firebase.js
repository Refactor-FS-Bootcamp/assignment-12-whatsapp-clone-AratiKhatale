import firebase from 'firebase/compat/app';  //for authentication
import 'firebase/compat/storage'; //for storage
import 'firebase/compat/database'; //for realtime database
import 'firebase/compat/firestore';  //for cloud firestore
import 'firebase/compat/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDzCI8mgaxHwHZge3qcfhrQswmSrMqq5YA",
  authDomain: "whatsapp-firebase-yt-b7747.firebaseapp.com",
  projectId: "whatsapp-firebase-yt-b7747",
  storageBucket: "whatsapp-firebase-yt-b7747.appspot.com",
  messagingSenderId: "72511218013",
  appId: "1:72511218013:web:502fdba783f49d2fb848b4"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db