
import CardSupport from "components/Cards/CardSupport";
import DoctorLayout from "layouts/DoctorLayout";

export default function Support() {
    return (
        <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSupport />
        </div>
        
      </div>
    )
}

 
Support.layout = DoctorLayout;