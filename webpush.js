// import 'firebase/messaging';
// import firebase from 'firebase/app';
// import localforage from 'localforage';

// const firebaseCloudMessaging = {
//   //checking whether token is available in indexed DB
//   tokenInlocalforage: async () => {
//     return localforage.getItem('fcm_token');
//   },

//   //initializing firebase app
//   init: async function () {
//     if (!firebase.apps.length) {
//       firebase.initializeApp({
//         apiKey: "AIzaSyCHVyikBLtktkc5QZa4e1xTNZ8PFNTIu8s",
//         authDomain: "api-project-19685698585.firebaseapp.com",
//         projectId: "api-project-19685698585",
//         storageBucket: "api-project-19685698585.appspot.com",
//         messagingSenderId: "19685698585",
//         appId: "1:19685698585:web:39d0145adad5d905558e88",
//         measurementId: "G-EZ3MV84DRS"
//       });

//       try {
//         const messaging = firebase.messaging();
//         const tokenInLocalForage = await this.tokenInlocalforage();

//         //if FCM token is already there just return the token
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         }

//         //requesting notification permission from browser
//         const status = await Notification.requestPermission();
//         if (status && status === 'granted') {
//           //getting token from FCM
//           const fcm_token = await messaging.getToken();
//           if (fcm_token) {
//             //setting FCM token in indexed db using localforage
//             localforage.setItem('fcm_token', fcm_token);
//             //return the FCM token after saving it
//             return fcm_token;
//           }
//         }
//       } catch (error) {
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };
// export { firebaseCloudMessaging };