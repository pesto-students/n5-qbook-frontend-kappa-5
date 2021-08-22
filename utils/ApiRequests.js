import axios from "axios";
import config from "../config/config";
import authHeader from "../config/auth-header";
export const getAsyncPostData = async (url, params, headers) => {
  headers= authHeader();
  headers = headers ? headers : {};
  params = params ? params : {};
  let apiURL = config.BASE_API_URL + url;
  const headerValue = {headers:headers }
  const responseData = await axios
    .post(apiURL, params, headerValue)
    .then((res) => {
      if (res.status == 201 || res.status == 200) {
        return res;
      } else {
        return false;
      }
    })
    .catch((error) => {
      return false;
    });
  const response = responseData ? responseData.data : false;
  return response;
};
export const getAsyncData = async (url,params, headers) => { 
   headers= authHeader();
   params = params ? params : {};
   let configValues = {
     headers,
    params: params,
  }
  headers = headers ? headers : [];
  let apiURL = config.BASE_API_URL + url;
  const responseData = await axios
    .get(apiURL,configValues)
    .then((res) => {
      if (res.status == 200) {
        return res;
      }
    })
    .catch((error) => {
      return false;
    });
  const response = responseData ? responseData.data : false;
  return response;
};