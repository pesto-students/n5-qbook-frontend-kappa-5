
import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCHVyikBLtktkc5QZa4e1xTNZ8PFNTIu8s",
    authDomain: "api-project-19685698585.firebaseapp.com",
    projectId: "api-project-19685698585",
    storageBucket: "api-project-19685698585.appspot.com",
    messagingSenderId: "19685698585",
    appId: "1:19685698585:web:39d0145adad5d905558e88",
    measurementId: "G-EZ3MV84DRS"
  };

  if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
 }else {
     firebase.app(); 
 }

  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  const db = firebase.firestore();

  export {auth,provider}
  export default firebase;