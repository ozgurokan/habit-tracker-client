import * as yup from "yup";

const reqmes = "Zorunlu alan!";
export const validationsLogin = yup.object().shape({
    username: yup.string().required(reqmes),
    password: yup.string().required(reqmes),
})


export const validationsRegister = yup.object().shape({
    username: yup.string().required(reqmes),
    password: yup.string().min(8,"Parola en az 8 karakter olmalıdır!").required(reqmes),
    passwordConfirm : yup.string().oneOf([yup.ref("password"),"Parolalar uyuşmuyor!"]).required(reqmes),
    name: yup.string().required(reqmes),
    surname : yup.string().required(reqmes),
    email : yup.string().email("Geçerli bir email girin!").required(reqmes)
})

export const changePassValidations = yup.object().shape({
    currentPassword : yup.string().required(reqmes),
    newPassword : yup.string().notOneOf([yup.ref("currentPassword","Yeni parolanız eski ile aynı olamaz!")]).min(8,"Parola en az 8 karakter olmalıdır!").required(reqmes),
    newPasswordConfirm : yup.string().oneOf([yup.ref("newPassword"),"Parolalar uyuşmuyor!"]).notOneOf([yup.ref("currentPassword"),"Yeni parola eskisi ile aynı olamaz"]).required(reqmes)
})

export const habitCreationValidation = yup.object().shape({
    name : yup.string().required(reqmes).min(8,"At least 8 char!")
})

export const commentCreationValidation = yup.object().shape({
    commentText : yup.string().required(reqmes).min(3,"At least 3 char!")
})

export const activitiyCreationValidation = yup.object().shape({
    name: yup.string().required(reqmes).min(5,"At least 5 char!").max(100,"Activities can contain up to 100 char!")
})