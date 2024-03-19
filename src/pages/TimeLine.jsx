import {useEffect, useState} from "react";
import {Flex,Button} from "@chakra-ui/react"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import HabitCardList from "../components/habitCard/HabitCardList";
import {fetchHabitsForTimeline} from "../api/fetchingHabitsMethods";
import HabitForm from "../components/habitCard/HabitForm";


function TimeLine() {


    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const {id} = useSelector((state) => state.auth.userData)

    const [loading,setLoading] = useState(true);
    const [habitlist,setHabitlist] = useState([]);
    const [page,setPage] = useState(0);
    const [maxPageCount,setMaxPageCount] = useState(1);




    const checkLoggedIn = (a) => {
        if(!a){
            navigate("/login")
        };
    };

    const refreshHabits = () => {
        setPage(0);
        setHabitlist(prev => []);
        loadHabits(page);
    }

    const loadHabits = (page) => {
        setLoading(true);
        fetchHabitsForTimeline(page).then(
            (res) => {
                setHabitlist(prev => [...prev,...res.content])
                setMaxPageCount(res.totalPages);
                setLoading(false);
            },
            (err) => {
                console.log(err);
            }
        );
    }


    useEffect(() => {
        checkLoggedIn(isLoggedIn);
        console.log(habitlist);
        loadHabits(page);
    },[page])


    const loadMore = () => {
        setPage(page+1)
    }


    return (  
    <Flex pb={"2%"} minHeight={"100vh"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>
        <HabitForm refreshHabits={refreshHabits}/>
        <HabitCardList habitList={habitlist}/>
        {
            loading && <div>Loading...</div>
        }
        <div>{page < maxPageCount ? <Button onClick={() => loadMore()}>Daha Fazla</Button> : <Button>Bitti</Button>}</div>    
            
    </Flex>


    );
}

export default TimeLine;