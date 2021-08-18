import React,{useEffect} from "react";
import Head from "next/head";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";
import firebase from "firebase/app";
import 'firebase/messaging';
import { firebaseCloudMessaging } from '../components/Service/webPush';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from '../app/store'
import {fcmToken,serviceWorker,errorSWReg,eventSW,fileSW,qBook,msgReceived} from 'utils/Constants'
const MyApp =(props)=> {
   useEffect(() => {
    const tokenFCM = (sessionStorage.getItem(`${fcmToken}`));
    if(!tokenFCM){
      setToken()
      if(`${serviceWorker}` in navigator){
        navigator.serviceWorker.register(`${fileSW}`)
        .then(function(registration){
         navigator.serviceWorker.addEventListener('message', (event) => console.log(`${eventSW}`, event))
        }).catch(function(err){
          console.log(`${errorSWReg}`, err)
        })
      }
    }
    });
    async function setToken(){
      try{
        const token = await firebaseCloudMessaging.init();
        if(token){
          sessionStorage.setItem(`${fcmToken}`, token)
          getMessage();
        }
      }catch(err){
        console.log(err);
      }
    }
    async function getMessage(){
    const messaging = firebase.messaging()
    messaging.onMessage((message) => {
     console.log(`${msgReceived}`, message);
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
          <title>{qBook}</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        </Provider>
      </React.Fragment>
    );
}
export default MyApp;