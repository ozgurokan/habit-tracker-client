import { useDispatch,useSelector} from "react-redux";
import axios from "axios";
import { getAccessToken } from "../redux/auth/helper";

const BASE_URL = import.meta.env.VITE_BASE_URL




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