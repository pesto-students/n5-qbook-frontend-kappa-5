
import firebase from "firebase";
import {createContext,useState} from "react";

export const ProfileContext = createContext();

function ProfileContextProvider({children}){
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [searchTerm, setSearchTerm] = useState("")
    const [patientList,setPatientList] = useState([{name:"Anna",phoneNumber:"12345678",date:"08/08/2021",paymentMode:"online"},
    {name:"helen",phoneNumber:"12225678",date:"08/08/2021",paymentMode:"online"},
    {name:"tom",phoneNumber:"34345656",date:"03/09/2021",paymentMode:"online"},
    {name:"Anna",phoneNumber:"67676756",date:"03/09/2021",paymentMode:"online"}]);
    const [doctorLoginInfo,setDoctorLoginInfo] = useState({});
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
    const signOut = () =>{
        firebase.auth.signOut();
    };
    
    return(
        <ProfileContext.Provider value={{doctorLoginInfo,setDoctorLoginInfo,profileInfo,setProfileInfo,handleInput,handleStartTime,
        handleEndTime,selectedDate,setSelectedDate,patientList,searchTerm, setSearchTerm,signOut}}>
            {children}
        </ProfileContext.Provider>
    )
}

export default ProfileContextProvider;