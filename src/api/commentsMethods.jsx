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


export const fetchCommentsByHabitId = async (habitId,page) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"comment/get-habit-comments/"+habitId+"?page="+page+"&size=5&sort=createAt,DESC", {
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

export const fetchCommentsByUsername = async (username) => {
    let response;
    try{
        const apiResponse = await axios.get(BASE_URL+"comment/get-user-comments/"+username, {
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