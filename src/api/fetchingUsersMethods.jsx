import axios from "axios";
import { getAccessToken } from "../redux/auth/helper";

const BASE_URL = import.meta.env.VITE_BASE_URL




export const fetchUsersForExplore = async (page) => {

    let response;
    try{
        const apiResponse =await axios.get(BASE_URL+"user/paginate?page="+page+"&size=2&sort=id", {
            headers: {
              Authorization: 'Bearer ' + getAccessToken()
            }
           });
        response = apiResponse.data
        return response;

    }catch(errors){
        console.error(errors)
    }
    
}

export const fetchUser = async (username) => {
    let response;
    try{
        const apiResponse =await axios.get(BASE_URL+"user/"+username, {
            headers: {
              Authorization: 'Bearer ' + getAccessToken()
            }
           });
        response = apiResponse.data
        return response;

    }catch(errors){
        console.error(errors)
    }
}