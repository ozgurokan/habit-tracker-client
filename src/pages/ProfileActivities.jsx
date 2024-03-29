import {useState,useEffect} from 'react'
import {useNavigate,useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {Flex} from "@chakra-ui/react"
import {fetchAllActivitiesByUser} from "../api/fetchingActivitiesMethods"
import ActivityCardList from '../components/acitivityCard/ActivityCardList';


function ProfileActivities() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [activities,setActivities] = useState([]);

    const propFromLink = useLocation();
    const userId = propFromLink.state.userId;


    const checkLoggedIn = (a) => {
        if(!a){
            navigate("/login")
        };
    };


    useEffect(() => {
        checkLoggedIn(isLoggedIn);
        setLoading(true);
        fetchAllActivitiesByUser(userId).then(
            (res) => {
                setActivities(res.content);
                setLoading(false);
            },
            (err) => {
                console.log(err);
            }
            )
    },[])


  return (
    <Flex pb={"2%"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>
            
    {
        loading && <div>Loading...</div>
    }
    {
        activities.length > 0 ? <ActivityCardList activityList={activities} ></ActivityCardList> : <>This user does not have any activity</>
    }
</Flex>
  )
}

export default ProfileActivities