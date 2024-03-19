import axios from "axios";
import { getAccessToken } from "../redux/auth/helper";

const BASE_URL = import.meta.env.VITE_BASE_URL




export const fetchUserAllLikes = async (userId) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"like/get-user-all-likes/"+userId, {
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

export const saveLike = async (userId,habitId) => {
    const body = {
        habitId,
        userId
    }
    try{
        const apiResponse = await axios.post(BASE_URL+"like",body,{
            headers:{
                Authorization : 'Bearer ' + getAccessToken()
            }
        });
        return apiResponse.data;
    }catch(err){
        console.log(err)
    }
}

export const deleteLike = async (likeId) => {
    try{
        const apiResponse = await axios.delete(BASE_URL+"like/"+likeId,{
            headers:{
                Authorization : 'Bearer ' + getAccessToken()
            }
        });
        return apiResponse.data;
    }catch(err){
        console.log(err)
    }
}
