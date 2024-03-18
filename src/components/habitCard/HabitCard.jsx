import {
    Card,CardHeader,Flex,Box,Avatar,Text,Heading,IconButton,
    CardBody,CardFooter,Button, Divider, Spinner

} from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import {fetchActivitiesByHabit} from "../../api/fetchingActivitiesMethods";
import {useState,useEffect} from "react";
import ActivityCardList from "../acitivityCard/ActivityCardList";
import ActivityForm from "../acitivityCard/ActivityForm";
import { fetchCommentsByHabitId } from "../../api/commentsMethods";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import {useSelector} from "react-redux";
import {deleteLike,saveLike} from "../../api/likeMethods";






function HabitCard({habit}) {

    const userId = useSelector((state) => state.auth.userData.id)
    const [activities, setActivities] = useState([]);
    const [comments,setComments] = useState([]);

    const [loading,setLoading] = useState(false);
    const [isActivitiesHidden,setIsActivitiesHidden] = useState(true);
    const [isCommentsHidden,setIsCommentsHidden] = useState(true);
    const [isLiked,setIsLiked] = useState(false);
    const [likeId,setLikeId] = useState(null);
    const [isRefresh,setIsResfresh] = useState(1);

    const [page,setPage] = useState(0);
    const [maxPage,setMaxPage] = useState(1);

    const fetchActivities = async (habitId,page) => {
        try{
            const response = await fetchActivitiesByHabit(habitId,page);
            setActivities(response.content);
            setMaxPage(response.totalPages);
        }catch(err){
            console.log(err);
        }
    }

    const fetchComments = (habitId) => {
        fetchCommentsByHabitId(habitId).then(
            (response) => {
                setComments(response.content);
            },
            (error) => {
                console.log(error)
        })
        
        console.log(comments);
    }

    const handleShowingActivities = (bool) => {
        bool ? setIsActivitiesHidden(false) : setIsActivitiesHidden(true)
        if(bool){
            setIsCommentsHidden(true);
            fetchActivities(habit.id);
        }
    }

    const handleShowingComments = (bool) => {
        bool ? setIsCommentsHidden(false) : setIsCommentsHidden(true)
        if(bool){
            setIsActivitiesHidden(true);
            fetchComments(habit.id);   
        }
    }

    const loadMore =() =>{
        setPage(page+1);
    }


    const saveLiked = () => {
        saveLike(userId,habit.id).then((res) => setLikeId(res.id));
    }

    const deleteLiked = () => {
        deleteLike(likeId);
    }

    const checkLikes = () => {
        var likeControl = habit.likesList.find((like => like.userId === userId));
        if(likeControl != null){
            setLikeId(likeControl.id)
            setIsLiked(true);
        }
    }

    const handleLike = () => {
        setIsLiked(!isLiked);
        if(!isLiked){
            saveLiked();
        }else{
            deleteLiked();
        }
    }



    useEffect(() => {checkLikes()},[])
    return ( 
        <Flex flexDir={"column"} minW="sm" maxW="sm" mb="5">
            {
               !loading ? <><Card  mt={"2%"} maxW='sm' size={"md"} background={"gray.400"} border={"1px white solid"}>
               <CardHeader>
                   <Flex spacing='4'>
                   <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                       <Avatar name={habit.user.name} />
                       <Box>
                       <Heading size='sm'>{habit.user.username}</Heading>
                       </Box>
   
                   </Flex>
   
                   <IconButton 
                       background={"none"}
                       size={"lg"}
                       icon={<MdFavorite fill={isLiked ? "red" : "white"}/>}
                       onClick={() =>{
                           handleLike();
                       }}
                   >Like</IconButton>
                   </Flex>
                   <Divider mt="2"/>
               </CardHeader>
   
               <CardBody >
                   <Text>
                       {habit.name}
                   </Text>
               </CardBody>
               <CardFooter
                   justify='space-between'
                   flexWrap='wrap'
                   sx={{
                   '& > button': {
                       minW: '136px',
                   },
                   }}
               >
                   <Button flex='1' variant='ghost' onClick={() => handleShowingComments(isCommentsHidden)}>
                   Comments
                   </Button>
                   <Button flex='1' variant='ghost' onClick={() => handleShowingActivities(isActivitiesHidden)}>
                   Activites
                   </Button>
               </CardFooter> 
           </Card>
           <Flex flexDir={"column"} alignItems="center"  justifyContent="center"  >
           {
               !isActivitiesHidden && (<> 
               
               <ActivityCardList activityList={activities}/> 
               
               {habit.user.id == userId && <ActivityForm habit={habit} refreshActivities={fetchActivities(habit.id,0)}/>}
               
               <Box>{page < maxPage && <Button onClick={() => loadMore()}>Daha Fazla</Button>} </Box> </>)
           }
           {
               !isCommentsHidden && (<>
                   <CommentList habit={habit} commentList={comments} />
                   <CommentForm habit={habit} refreshComments={fetchComments(habit.id)} />
                   <Box>{page < maxPage && <Button onClick={() => loadMore()}>Daha Fazla</Button>} </Box>
               </>)
               
           }
           
           </Flex></> : <Flex justifyContent={"center"} alignItems={"center"}> <Spinner/></Flex>
            }

        </Flex>

     ); 
}

export default HabitCard;