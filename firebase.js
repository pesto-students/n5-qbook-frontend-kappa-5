
import firebase from "firebase";
import "firebase/messaging";
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

//let messaging;


 // messaging = firebase.messaging();

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const db = firebase.firestore();

export {auth,provider}
export default firebase;

  // if (firebase.apps.length === 0) {
  //   firebase.initializeApp(firebaseConfig);}
  //   const auth = firebase.auth();
  //   const messaging = firebase.messaging();
  //   navigator.serviceWorker.getRegistrations().then((registrations) => {
  //     if (registrations.length === 0) {
  //       navigator.serviceWorker
  //         .register("/firebase-message-sw.js")
  //         .then((registration) => {
  //           registration = registration;
  //         });
  //     } 
  //   });
  
  // navigator.serviceWorker
  //   .register('/public/firebase-messaging-sw.js')
  //   .then((registration) => {
  //    firebase.messaging().useServiceWorker(registration);

  //   });

//   if (!firebase.apps.length) {
//     initializeFirebase();
//  }else {
//      firebase.app(); 
//  }
//  window.navigator.serviceWorker
//  .register('/public/firebase-messaging-sw.js')
//  .then((registration) => {
//    firebase.messaging().useServiceWorker(registration);
//  });

 // const auth = firebase.auth();
 // const provider = new firebase.auth.GoogleAuthProvider();

  // export const askForPermissioToReceiveNotifications = async () => {
  //   try {
  //     const messaging = firebase.messaging();
  //     await messaging.requestPermission();
  //     const token = await messaging.getToken();
  //     console.log('token do push notifications:', token);
      
  //     return token;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }
//   const messaging = firebase.messaging();
// const publicKey = "BE-QIly0dhEhwxGy7HK1-0ukeqjzbmJE9IIqCFRe1-fV2MSpnhtc-ipMGXOktjTXkrIeGx0948zOZSUVh1aosqk";
// export const getToken = async (setTokenFound) =>{
//     let currentToken="";
//     try{
//         currentToken= await messaging.getToken({vapidKey:publicKey});
//         if(currentToken){
//             setTokenFound(true);
//         }
//         else{
//             setTokenFound(false);
//         }
//     }catch(error){
//         console.log('an error occurred while retrieving token',error);
//     }
//     return currentToken;
// };
//  export {auth,provider}
 // export default firebase;