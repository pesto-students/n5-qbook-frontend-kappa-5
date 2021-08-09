
import axios from "axios";
import config from "../config/config";

export const getAsyncPostData = async (url, params, headers) => {

  headers = headers ? headers : {};
  params = params ? params : {};
  let apiURL = config.BASE_API_URL + url;
  const responseData = await axios
    .post(apiURL, params, headers)
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
export const getAsyncData = async (url, headers) => {
  // console.log('Async Data', url,config);
  headers = headers ? headers : [];
  let apiURL = config.BASE_API_URL + url;
  console.log('api get url=', apiURL)
  const responseData = await axios
    .get(apiURL, headers)
    .then((res) => {
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
