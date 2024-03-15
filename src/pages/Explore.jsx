import {useEffect, useState} from "react";
import {Flex,Button,Box} from "@chakra-ui/react"
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import UserCardList from '../components/userCard/UserCardList';
import { fetchUsersForExplore } from "../api/fetchingUsersMethods";

function Explore() {


  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const [loading,setLoading] = useState(true);
  const [userList,setUserList] = useState([]);
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
      async function fetching() {
        try{
          const response = await fetchUsersForExplore(page);
          setUserList(prev => [...prev,...response.content])
          setMaxPageCount(response.totalPages);
          setLoading(false);
          return response
        }catch(error){
          console.log(error);
        }
      }
      fetching();
  },[page])

  const loadMore = () => {
    setPage(page+1)
  }


 
  return (
    <Flex pb={"2%"} minHeight={"100vh"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>

      

        <UserCardList userList={userList} />
        {loading && <div>Loading...{loading}</div>}
        <Box mt={"2%"}>{page < maxPageCount ? <Button onClick={() => loadMore()}>Daha Fazla</Button> : <Button>Bitti</Button>}</Box>
    </Flex>
  )
  
  
}

export default Explore