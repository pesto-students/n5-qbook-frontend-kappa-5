import CardPatientInfo from "components/Cards/CardPatientInfo";
import DoctorLayout from "layouts/DoctorLayout";
import {useRouter} from "next/router";
export default function Consultation(props) {
  console.log(props,"props")
  const router = useRouter();
  const { searchToken } = router.query;

  console.log(searchToken,"searchToken in [file]")
    return (
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardPatientInfo searchToken={searchToken}/>
        </div>
        
      </div>
    )
}
export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
 
Consultation.layout = DoctorLayout;