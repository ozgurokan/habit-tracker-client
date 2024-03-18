import axios from "axios";
import { getAccessToken } from "../redux/auth/helper";

const BASE_URL = import.meta.env.VITE_BASE_URL




export const fetchAllActivitiesByUser = async (userId) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"activity/get-all/"+userId, {
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

export const fetchActivitiesByHabit = async (habitId,page) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"habit/"+habitId+"/activities/paginate?page="+page+"&size=5", {
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

export const createNewActivitiy = async (request) => {
    try{
        const apiResponse = await axios.post(BASE_URL+"activity",request,{
            headers: {
              Authorization: 'Bearer ' + getAccessToken()
            }
           });
        return apiResponse.data

    }catch(errors){
        console.error("burda error" + errors)
    }
}


