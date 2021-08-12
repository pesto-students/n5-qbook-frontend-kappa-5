export default function authHeader() {
  //debugger;
    const user = JSON.parse(sessionStorage.getItem("doctor_login"));
    if (user && user.result.accessToken) {
      //return {headers:{Authorization: 'Bearer ' + user.result.accessToken }};
      return {Authorization: 'Bearer ' + user.result.accessToken };
    } else {
      return {};
    }
  }