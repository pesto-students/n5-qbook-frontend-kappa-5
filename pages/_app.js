import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import App from "next/app";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import ProfileContextProvider from 'Context/ProfileContext';
import firebase from "firebase/app";
import 'firebase/messaging';
import { firebaseCloudMessaging } from '../components/Service/webPush';
import { func } from "prop-types";


//import firebase from '../firebase'
// export default class MyApp extends App {
  
//   static async getInitialProps({ Component, router, ctx }) {
//     let pageProps = {};
//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }
//     return { pageProps };
//   }
//   render() {
//     const { Component, pageProps } = this.props;
//     const Layout = Component.layout || (({ children }) => <>{children}</>);
//     return (
//       <React.Fragment>
//       <ProfileContextProvider>
//         <Head>
//           <meta
//             name="viewport"
//             content="width=device-width, initial-scale=1, shrink-to-fit=no"
//           />
//           <title>QBook</title>
//         </Head>
//         <Layout>
//           <Component {...pageProps} />
//         </Layout>
//         </ProfileContextProvider>
//       </React.Fragment>
//     );
//   }
// }

 const MyApp =(props)=> {
   
   useEffect(() => {
    setToken()
     if("serviceWorker" in navigator){
       navigator.serviceWorker.register('./firebase-messaging-sw.js')
       .then(function(registration){
        console.log("Registration successful, scope is:", registration.scope);
        navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
       }).catch(function(err){
         console.log("Service worker registration failed, error:", err)
       })
     }
    });


    async function setToken(){
      try{
        const token = await firebaseCloudMessaging.init();
        if(token){
          console.log('token',token);
          getMessage();
        }
      }catch(err){
        console.log(err);
      }
    }

    async function getMessage(){
      console.log('message functions')
    const messaging = firebase.messaging()
    messaging.onMessage((message) => console.log('foreground', message))
    }
  // useEffect(() => {
    
  //   navigator.serviceWorker
  //   .register('../public/firebase-messaging-sw.js')
  //   .then((registration) => {
  //     firebase.messaging().useServiceWorker(registration);
  //   });
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker
    //     .register("../public/firebase-messaging-sw.js")
    //     .then(function(registration) {
    //       console.log("Registration successful, scope is:", registration.scope);
    //       firebase.messaging.getToken({vapidKey: 'BE-QIly0dhEhwxGy7HK1-0ukeqjzbmJE9IIqCFRe1-fV2MSpnhtc-ipMGXOktjTXkrIeGx0948zOZSUVh1aosqk', serviceWorkerRegistration : registration })
    //         .then((currentToken) => {
    //           if (currentToken) {
    //             console.log('current token for client: ', currentToken);
      
    //             // Track the token -> client mapping, by sending to backend server
    //             // show on the UI that permission is secured
    //           } else {
    //             console.log('No registration token available. Request permission to generate one.');
      
    //             // shows on the UI that permission is required 
    //           }
    //         }).catch((err) => {
    //           console.log('An error occurred while retrieving token. ', err);
    //           // catch error while creating client token
    //         });  
    //       })
    //       .catch(function(err) {
    //         console.log("Service worker registration failed, error:"  , err );
    //     }); 
    //   }
  //}, [])
  // useEffect(() => {
  //   initializeFirebase();
  // }, [])
    const { Component, pageProps } = props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);
    return (
      <React.Fragment>
      <ProfileContextProvider>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <title>QBook</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </ProfileContextProvider>
      </React.Fragment>
    );
  
}

MyApp.getInitialProps = async({ Component, router, ctx }) =>{
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
}
export default MyApp;