import axios from "axios";
import { getAccessToken } from "../redux/auth/helper";

const BASE_URL = import.meta.env.VITE_BASE_URL



export const createNewHabit = async (habitRequest) => {
    let response;
    try{
        const apiResponse = await axios.post(BASE_URL+"habit",habitRequest,{
            headers:{
                Authorization : 'Bearer ' + getAccessToken()
            },
        });
        response = apiResponse.data;
        return response;
    }catch(errors){
        console.error(errors);
    }
}

export const fetchHabitsForTimeline = async (page) => {

    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"habit/paginate?page="+page+"&size=5&sort=id,desc", {
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

export const fetchUserHabitListForProfile = async (username) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"user/"+username+"/habits", {
            headers: {
              Authorization: 'Bearer ' + getAccessToken()
            }
           });
        response = apiResponse.data;
        return response
    }catch(errors){
        console.error(errors)
    }
}