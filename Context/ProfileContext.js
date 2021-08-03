
import {createContext,useState} from "react";

export const ProfileContext = createContext();

function ProfileContextProvider({children}){
    const [profileInfo,setProfileInfo] = useState({
        name:"",
        photoUrl:"",
        specialization:"",
        maxAppointments:50,
        fees:500,
        startTime:{hours:"00",minutes:"00",period:"AM"},
        endTime:{hours:"00",minutes:"00",period:"AM"},
    });
    const handleStartTime = (e) =>{
        let valueProp = e.target.name
        setProfileInfo({ 
            ...profileInfo,
            startTime: {
                ...profileInfo.startTime, // Spread the startTime object to preserve all values
                [valueProp]: e.target.value
            }
        });
        
    }
    const handleEndTime = (e) =>{
        let valueProp = e.target.name
        setProfileInfo({ 
            ...profileInfo,
            endTime: {
                ...profileInfo.endTime, // Spread the endTime object to preserve all values
                [valueProp]: e.target.value
            }
        });
        
    }
    const handleInput = (e) =>{
        let propName = e.target.name;
        let propValue = e.target.value;
        setProfileInfo({...profileInfo,[propName]:propValue})
    }
    return(
        <ProfileContext.Provider value={{profileInfo,setProfileInfo,handleInput,handleStartTime,handleEndTime}}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;