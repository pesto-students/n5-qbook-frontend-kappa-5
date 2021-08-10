//import {errorName,errorSpecialization,errorBio,errorFees} from './Constants'
function validation(values) {
    let errors={};
    if(!values.firstname.trim()){
        errors.firstname="Name is Required"
    }
    if(!values.title.trim()){
        errors.title="Specialization is Required"
    }
    if(!values.brief){
        errors.brief="Short bio is Required"
    }
    if(!values.fees){
        errors.fees="Fees is Required"
    }
    if(values.startTime.hours>values.endTime.hours || 
        (values.startTime.hours===values.endTime.hours && values.startTime.minutes===values.endTime.minutes) ||
        (values.startTime.hours===values.endTime.hours && values.startTime.minutes>values.endTime.minutes)
        ){
        errors.startTime="start time should be less than end time"
    }
    return errors;
}

export default validation
