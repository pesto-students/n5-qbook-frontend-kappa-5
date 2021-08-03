importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js');

firebase.initializeApp({
    //   apiKey: "AIzaSyCHVyikBLtktkc5QZa4e1xTNZ8PFNTIu8s",
    // authDomain: "api-project-19685698585.firebaseapp.com",
    // projectId: "api-project-19685698585",
    // storageBucket: "api-project-19685698585.appspot.com",
    messagingSenderId: "19685698585",
    // appId: "1:19685698585:web:39d0145adad5d905558e88",
    // measurementId: "G-EZ3MV84DRS"
});
console.log("inside sw fie")
 const messaging = firebase.messaging();
// const token = messaging.getToken({vapidKey: "BE-QIly0dhEhwxGy7HK1-0ukeqjzbmJE9IIqCFRe1-fV2MSpnhtc-ipMGXOktjTXkrIeGx0948zOZSUVh1aosqk"});

// console.log(token,"token")
// var firebaseConfig = {
//     apiKey: "AIzaSyCHVyikBLtktkc5QZa4e1xTNZ8PFNTIu8s",
//     authDomain: "api-project-19685698585.firebaseapp.com",
//     projectId: "api-project-19685698585",
//     storageBucket: "api-project-19685698585.appspot.com",
//     messagingSenderId: "19685698585",
//     appId: "1:19685698585:web:39d0145adad5d905558e88",
//     measurementId: "G-EZ3MV84DRS"
//   };

//   firebase.initializeApp(firebaseConfig);

//   const messaging = firebase.messaging()

//   messaging.onBackgroundMessage(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
//     // Customize notification here
//     const notificationTitle = 'Background Message Title';
//     const notificationOptions = {
//       body: 'Background Message body.',
     
//     };
  
//     self.registration.showNotification(notificationTitle,
//       notificationOptions);
//   });

  //-------------
// // if('serviceWorker' in navigator){
// //     navigator.serviceWorker.register('firebase-messaging-sw.js')
// //     .then(function(registration){
// //         console.log('Registration successful, scope is:',registration.scope);
// //     }).catch(function(err){
// //         console.log('Service Worker registration failed',err);
// //     });
// // };
// if (!firebase.apps.length) {
//     firebase.initializeApp({
//      messagingSenderId: 19685698585
//     });
//     firebase.messaging();
//     //background notifications will be received here
//     firebase.messaging().setBackgroundMessageHandler((payload) => console.log('payload', payload));
//     }
// // const messagingSenderId = "19685698585";
// // firebase.initializeApp({ messagingSenderId });

// // const initMessaging = firebase.messaging()