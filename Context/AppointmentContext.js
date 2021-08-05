import {createContext,useState,useEffect} from "react";

export const AppointmentContext = createContext();

function AppointmentContextProvider({children}){
    const [selectedDate, setSelectedDate] = useState(null)
    const [patientList,setPatientList] = useState([{name:"Anna",phoneNumber:"12345678",date:"03/08/2021",paymentMode:"online"},
    {name:"Anna",phoneNumber:"12345678",date:"03/08/2021",paymentMode:"online"},
    {name:"Anna",phoneNumber:"12345678",date:"03/08/2021",paymentMode:"online"},
    {name:"Anna",phoneNumber:"12345678",date:"03/08/2021",paymentMode:"online"}]);
    useEffect(() => {
        const newPatientList = patientList.filter(a => new Date(a.startDate) - new Date() === 0);
        console.log(newPatientList,"newPatientList")
    }, [selectedDate])
    
    
   
    
    return(
        <AppointmentContext.Provider value={{selectedDate,setSelectedDate,patientList}}>
            {children}
        </AppointmentContext.Provider>
    )
}

export default AppointmentContextProvider;