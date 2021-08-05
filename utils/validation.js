function validation(values) {
    console.log("inside validation ",values)
    
    let errors={};
    if(!values.name.trim()){
        errors.name="Name is Required"
    }
    if(!values.specialization.trim()){
        errors.specialization="specialization is Required"
    }
    if(!values.maxAppointments.trim()){
        errors.maxAppointments="maxAppointments is Required"
    }
    if(!values.fees.trim()){
        errors.fees="fees is Required"
    }
    if(values.startTime.hours>values.endTime.hours || 
        (values.startTime.hours===values.endTime.hours && values.startTime.minutes===values.endTime.minutes 
        && values.startTime.period===values.endTime.period) ||
        (values.startTime.hours===values.endTime.hours && values.startTime.minutes>values.endTime.minutes 
            && values.startTime.period===values.endTime.period)
        ){
        errors.startTime="start time should be less than end time"
    }
    return errors;
}

export default validation
