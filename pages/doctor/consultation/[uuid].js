import CardPatientInfo from "components/Cards/CardPatientInfo";
import DoctorLayout from "layouts/DoctorLayout";
import {useRouter} from "next/router";
export default function Consultation() {
  const router = useRouter();
  const { uuid } = router.query;
    return (
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardPatientInfo uuid={uuid}/>
        </div>
        
      </div>
    )
}

 
Consultation.layout = DoctorLayout;