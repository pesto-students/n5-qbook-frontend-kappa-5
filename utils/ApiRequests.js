import api from '../apiconfig';

export const doctorLoginInfo = async(userInfo) =>{ 
    return  await api.post("/user/login",userInfo)
                  .then(response =>{
                    return response.data;         
                  }
                  )
                  .catch(console.log);
}

export const getAppointments = async(accessToken) =>{ 
    const headers = {
        'Authorization': 'Bearer ' + accessToken,
    }
    return  await api.get("/user/dashboard",headers)
                  .then(response =>{
                    return response.data;         
                  }
                  )
                  .catch(console.log);
}