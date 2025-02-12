export interface FormData{
    firstname : string,
    lastname : string,
    email : string,
    phone : string,
    password : string,
    confirmPassword: string
}

export type loginData = {
    email : string,
    password : string
}

export type otpData ={
    digitOne : string,
    digitTwo : string,
    digitThree : string,
    digitFour : string,
}