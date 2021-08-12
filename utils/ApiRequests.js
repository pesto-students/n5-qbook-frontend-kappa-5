import axios from "axios";
import config from "../config/config";
import authHeader from "../config/auth-header";
export const getAsyncPostData = async (url, params, headers) => {
  headers= authHeader();
  headers = headers ? headers : {};
  params = params ? params : {};
  let apiURL = config.BASE_API_URL + url;
  const headerValue = {headers:headers }
  //console.log('Async Data', url,params,headerValue);
  //debugger;
  const responseData = await axios
    .post(apiURL, params, headerValue)
    .then((res) => {
      //console.log(res.status);
      if (res.status == 201 || res.status == 200) {
        return res;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.log("Error In Api = " + error);
      return false;
    });
  //console.log(responseData);
  const response = responseData ? responseData.data : false;
  return response;
};
export const getAsyncData = async (url,params, headers) => {
  //debugger;  
   headers= authHeader();
   params = params ? params : {};
   let configValues = {
     headers,
    params: params,
  }
  // console.log('Async Data', url,configValues);
  headers = headers ? headers : [];
  let apiURL = config.BASE_API_URL + url;
  //console.log('api get url=', apiURL)
  const responseData = await axios
    .get(apiURL,configValues)
    .then((res) => {
      //console.log(res,"res in api")
      if (res.status == 200) {
        return res;
      }
    })
    .catch((error) => {
      console.log(error);
      console.log("Error In Api = " + url);
      return false;
    });
  // console.log('getAsyncData',responseData);
  const response = responseData ? responseData.data : false;
  return response;
};