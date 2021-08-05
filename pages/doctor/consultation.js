import CardPatientInfo from "components/Cards/CardPatientInfo";
import DoctorLayout from "layouts/DoctorLayout";

export default function Consultation() {
    return (
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardPatientInfo />
        </div>
        
      </div>
    )
}

 
Consultation.layout = DoctorLayout;