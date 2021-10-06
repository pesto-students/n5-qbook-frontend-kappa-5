export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("doctor_login"));
    if (user && user.result.accessToken) {
      //return {headers:{Authorization: 'Bearer ' + user.result.accessToken }};
      return {Authorization: 'Bearer ' + user.result.accessToken };
    } else {
      return {};
    }
  }