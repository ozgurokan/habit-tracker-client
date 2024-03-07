import {useEffect, useState} from "react";
import {Box, Flex} from "@chakra-ui/react"
import {useSelector} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom";
import HabitCardList from "../components/habitCard/HabitCardList";
import {fetchUserHabitListForProfile} from "../api/fetchingHabitsMethods";


function ProfileHabits() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [habitlist,setHabitlist] = useState([]);

    const propFromLink = useLocation();
    const username = propFromLink.state.username;


    const checkLoggedIn = (a) => {
        if(!a){
            navigate("/login")
        };
    };


    useEffect(() => {
        checkLoggedIn(isLoggedIn);
        setLoading(true);
        (async function(){
            try{
                const response = await fetchUserHabitListForProfile(username);
                setHabitlist(response);
                setLoading(false);
            }catch(err){
                console.log(err);
            } 
        })()
    },[])



    return (  
        <Flex pb={"2%"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>
            
            {
                loading && <div>Loading...</div>
            }
            {
                habitlist.length > 1 ? <HabitCardList habitList={habitlist} /> : <Box>This user does not have any habbit post</Box>
            }
        </Flex>


    );
}

export default ProfileHabits