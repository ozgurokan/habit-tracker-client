import {useEffect, useState} from "react";
import SideBar from "../components/sidebar/SideBar";
import {Flex,Button} from "@chakra-ui/react"
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import HabitCardList from "../components/habitCard/HabitCardList";
import {fetchHabitsForTimeline} from "../api/fetchingHabitsMethods";



function TimeLine() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);
    const [habitlist,setHabitlist] = useState([]);
    const [page,setPage] = useState(0);
    const [maxPageCount,setMaxPageCount] = useState(0);



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
                const response = await fetchHabitsForTimeline(page);
                setHabitlist(old => [...old,...response.content]);
                setMaxPageCount(response.totalPages);
                setLoading(false);
            }catch(err){
                console.log(err);
            } 
        })()
    },[page])

    const loadMore = () => {
        setPage(page+1)
    }


    return (  
        <Flex pb={"2%"} minHeight={"100vh"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>
            <HabitCardList habitList={habitlist} />
            {
                loading && <div>Loading...</div>
            }
            <div>{page < maxPageCount ? <Button onClick={() => loadMore()}>Daha Fazla</Button> : <Button>Bitti</Button>}</div>    
            
        </Flex>


    );
}

export default TimeLine;