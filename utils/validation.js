
function validation(values) {
    let errors={};
    if(!values.record.firstname.trim()){
        errors.firstname="Name is Required"
    }
    if(!values.setting.title.trim()){
        errors.title="Specialization is Required"
    }
    if(!values.setting.brief){
        errors.brief="Short bio is Required"
    }
    if(!values.setting.fees){
        errors.fees="Fees is Required"
    }
    // if(!values.diagnosis.trim()){
    //     errors.diagnosis="diagnosis is Required"
    // }
    // if(!values.patientName.trim()){
    //     errors.patientName="Name is Required"
    // }
    // if(!values.prescription.trim()){
    //     errors.prescription="prescription is Required"
    // }
    if(values.setting.startTime.hours>values.setting.endTime.hours || 
        (values.setting.startTime.hours===values.setting.endTime.hours && values.setting.startTime.minutes===values.setting.endTime.minutes 
        && values.setting.startTime.period===values.setting.endTime.period) ||
        (values.setting.startTime.hours===values.setting.endTime.hours && values.setting.startTime.minutes>values.setting.endTime.minutes 
            && values.setting.startTime.period===values.setting.endTime.period)
        ){
        errors.startTime="start time should be less than end time"
    }
    return errors;
}

export default validation
