import 'firebase/messaging';
import firebase from 'firebase/app';
import localforage from 'localforage';


const firebaseCloudMessaging = {
    tokenInlocalforage: async () => {
        return localforage.getItem('fcm_token')
    },

    init: async function () {
        try {
            const messaging = firebase.messaging()
            const tokenInLocalForage = await this.tokenInlocalforage()
            //if FCM token is already there just return the token
            if (tokenInLocalForage !== null) {
              return tokenInLocalForage
            }
            //requesting notification permission from browser
            const status = await Notification.requestPermission()
            if (status && status === 'granted') {
              //getting token from FCM
              const fcm_token = await messaging.getToken({
                vapidKey: 'BE-QIly0dhEhwxGy7HK1-0ukeqjzbmJE9IIqCFRe1-fV2MSpnhtc-ipMGXOktjTXkrIeGx0948zOZSUVh1aosqk'
              })
              if (fcm_token) {
                //setting FCM token in indexed db using localforage
                localforage.setItem('fcm_token', fcm_token)
                //return the FCM token after saving it
                return fcm_token
              }
            }
          } catch (error) {
            return null
          }
        }
    }
    export { firebaseCloudMessaging }
