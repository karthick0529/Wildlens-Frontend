
import * as Yup from 'yup';

const passwordRules= /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
export const loginSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email address').required("This field is required"),
    password:Yup.string().min(8,"Minimum 8 params required").matches(passwordRules,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("This field is required"),
})

export const registerSchema = Yup.object().shape({
    email: Yup.string().email('please enter valid email address').required("This field is required"),
    password:Yup.string().min(8,"Minimum 8 params required").matches(passwordRules,"Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character").required("This field is required"),
    userName:Yup.string().min(3,"Minimum 3 params required").required("This field is required"),
})
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const bookingSchema = Yup.object().shape({
    fullName:Yup.string().min(3,"Minimum 3 params required").required("This field is required"),
    phone:Yup.string().matches(phoneRegExp,'Phone number is not valid')
    .min(10, "Phone Num should contain 10 digits")
    .max(10, "Phone Num should contain 10 digits").required("This field is required"),
    bookAt:Yup.date().min(new Date(), 'The date cannot be in the past').required("Please Select Date"),
    guestSize:Yup.number().min(1,"please enter no of people").max(10,'You can only book 10 tickets').required("This field is required"),
})