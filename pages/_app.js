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
import 'react-datepicker/dist/react-datepicker.css';
import router from "next/router";
import PageChange from "components/PageChange/PageChange";
import { Provider } from "react-redux";
import { store } from '../app/store'
// router.events.on("routeChangeStart", (url) => {
//   document.body.classList.add("body-page-transition");
//   ReactDOM.render(
//     <PageChange path={url} />,
//     document.getElementById("page-transition")
//   );
// });
// router.events.on("routeChangeComplete", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
// router.events.on("routeChangeError", () => {
//   ReactDOM.unmountComponentAtNode(document.getElementById("page-transition"));
//   document.body.classList.remove("body-page-transition");
// });
 const MyApp =(props)=> {
   
   useEffect(() => {
    setToken()
     if("serviceWorker" in navigator){
       navigator.serviceWorker.register('./firebase-messaging-sw.js')
       .then(function(registration){
        //console.log("Registration successful, scope is:", registration.scope);
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
          sessionStorage.setItem('fcm_token', token)
          getMessage();
        }
      }catch(err){
        console.log(err);
      }
    }
    async function getMessage(){
     // console.log('message functions')
    const messaging = firebase.messaging()
    messaging.onMessage((message) => {
     console.log("Message received. ", message);
     let msg = message.data.notification
     console.log(msg,"destructured msg");
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

MyApp.getInitialProps = async({ Component, router, ctx }) =>{
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
}
export default MyApp;