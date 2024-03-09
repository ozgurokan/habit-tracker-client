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
        const apiResponse = await axios.get(BASE_URL+"habit/"+habitId+"/activities/paginate?page="+page+"&size=2", {
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


