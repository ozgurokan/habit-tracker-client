import axios from "axios";


const BASE_URL = import.meta.env.VITE_BASE_URL



export const login = async(values) => {
    const request = {username:values.username,password:values.password};
    const response  = await axios.post(BASE_URL+'auth/login',request);

    return response.data;
};

export const register = async(values) => {
    const request = {
        name:values.name +" "+ values.surname,
        username: values.username,
        password: values.password,
        email: values.email
    };
    const response = await axios.post(BASE_URL+'auth/register',request);
    return response.data;
}
