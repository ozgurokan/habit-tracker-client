import axios from "axios";
import { getAccessToken } from "../redux/auth/helper";

const BASE_URL = import.meta.env.VITE_BASE_URL



export const createNewComment = async (createCommentRequest) => {

    try{
        const apiResponse = await axios.post(BASE_URL+"comment",createCommentRequest, {
            headers: {
              Authorization: 'Bearer ' + getAccessToken()
            }
           });
        const response = apiResponse.data
        return response;

    }catch(error){
        console.log(error);
    }
}


export const fetchCommentsByHabitId = async (habitId) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"comment/get-habit-comments/"+habitId, {
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

export const fetchCommentsByUserId = async (userId) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"comments/get-user-comments/"+userId, {
            headers: {
              Authorization: 'Bearer ' + getAccessToken()
            }
           });
        response = apiResponse.data
        return response.content;

    }catch(errors){
        console.error(errors)
    }
}