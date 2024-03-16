import {Flex} from "@chakra-ui/react";
import {useState,useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate,useLocation} from "react-router-dom";
import { fetchCommentsByUsername } from "../api/commentsMethods";
import CommentList from "../components/comment/CommentList";


function ProfileComments() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const [loading,setLoading] = useState(true);
    const [comments,setComments] = useState([]);

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
                const response = await fetchCommentsByUsername(username);
                setComments(response);
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
        comments.length > 0 ? <CommentList commentList={comments} ></CommentList> : <>This user does not have any comment</>
        }

    </Flex>
  )
}

export default ProfileComments