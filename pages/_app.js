import React,{useEffect} from "react";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import firebase from "firebase/app";
import 'firebase/messaging';
import { firebaseCloudMessaging } from '../components/Service/webPush';
import 'react-datepicker/dist/react-datepicker.css';
import { Provider } from "react-redux";
import { store } from '../app/store'
 
const MyApp =(props)=> {
  
   useEffect(() => {
    const tokenFCM = (sessionStorage.getItem("fcm_token"));
    if(!tokenFCM){
      setToken()
      if("serviceWorker" in navigator){
        navigator.serviceWorker.register('./firebase-messaging-sw.js')
        .then(function(registration){
         navigator.serviceWorker.addEventListener('message', (event) => console.log('event for the service worker', event))
        }).catch(function(err){
          console.log("Service worker registration failed, error:", err)
        })
      }
    }
    
    });
    async function setToken(){
      try{
        const token = await firebaseCloudMessaging.init();
        if(token){
          sessionStorage.setItem('fcm_token', token)
          getMessage();
        }
      }catch(err){
        console.log(err);
      }
    }
    async function getMessage(){
    const messaging = firebase.messaging()
    messaging.onMessage((message) => {
     console.log("Message received. ", message);
    })
    }
    const { Component, pageProps } = props;
    const Layout = Component.layout || (({ children }) => <>{children}</>);
    return (
      <React.Fragment>
      <Provider store={store}>
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
        </Provider>
      </React.Fragment>
    );
  
}

// MyApp.getInitialProps = async({ Component, router, ctx }) =>{
//   let pageProps = {};
//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }
//   return { pageProps };
// }
export default MyApp;