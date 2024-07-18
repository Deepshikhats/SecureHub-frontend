import * as Yup from "yup";
const sharedSchema = {
    email : Yup.string().email().required('Email/Username is required'),
    password: Yup.string().min(6).required('password is required')
}
const LoginSchema = Yup.object({...sharedSchema})

const SignupSchema = Yup.object({
    name : Yup.string().required('Name is required'),
    ...sharedSchema
})

export {LoginSchema,SignupSchema}