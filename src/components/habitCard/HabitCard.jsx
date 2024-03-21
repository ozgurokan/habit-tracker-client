import {
    Card,CardHeader,Flex,Box,Avatar,Text,Heading,IconButton,
    CardBody,CardFooter,Button, Divider, Spinner

} from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import {fetchActivitiesByHabit} from "../../api/fetchingActivitiesMethods";
import {useState,useEffect,useRef} from "react";
import ActivityCardList from "../acitivityCard/ActivityCardList";
import ActivityForm from "../acitivityCard/ActivityForm";
import { fetchCommentsByHabitId } from "../../api/commentsMethods";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import {useSelector} from "react-redux";
import {deleteLike,saveLike} from "../../api/likeMethods";






function HabitCard({habit}) {

    const didMount = useRef(true);
    const userId = useSelector((state) => state.auth.userData.id)

    const [activities, setActivities] = useState([]);
    const [comments,setComments] = useState([]);

    const [loading,setLoading] = useState(false);

    const [isActivitiesHidden,setIsActivitiesHidden] = useState(true);
    const [isCommentsHidden,setIsCommentsHidden] = useState(true);

    const [isLiked,setIsLiked] = useState(false);
    const [likeId,setLikeId] = useState(null);
    const [likesCount,setLikesCount] = useState(habit.likesList.length);

    const [commentPage,setCommentPage] = useState(-1);
    const [maxCommentPage,setMaxCommentPage] = useState(0);
    const [commentLoading,setCommentLoading] = useState(false);
    const [isRefreshComment,setIsRefreshComment] = useState(false);


    const [activityPage,setActivityPage] = useState(-1);
    const [maxActivityPage,setMaxActivityPage] = useState(0);
    const [activityLoading,setActivityLoading] = useState(false);
    const [isActivityRefresh,setIsActivityResresh] = useState(false);





    const handleShowingActivities = (bool) => {
        bool ? setIsActivitiesHidden(false) : setIsActivitiesHidden(true)
        if(bool){
            setIsCommentsHidden(true);
            setActivities([]);
            setActivityPage(0);
        }
    }

    const handleShowingComments = (bool) => {
        bool ? setIsCommentsHidden(false) : setIsCommentsHidden(true)
        if(bool){
            setIsActivitiesHidden(true);
            setComments([]);
            setCommentPage(0);
        }
    }

    const saveLiked = () => {
        setLikesCount(prev => prev +1);
        saveLike(userId,habit.id).then((res) => setLikeId(res.id));
    }

    const deleteLiked = () => {
        setLikesCount(prev => prev -1);
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

    useEffect(()=>{
        checkLikes();
    },[])

    useEffect(() => {
        if(didMount.current){
            didMount.current=false;
        }
        else{
            setLoading(true);
            fetchCommentsByHabitId(habit.id,commentPage).then(
                (response) => {
                    setComments((prev) => [...prev,...response.content]);
                    setMaxCommentPage(response.totalPages);
                    setLoading(false);
                    console.log(comments)
                },
                (error) => {
                    console.log(error)
            })
        }
    },[commentPage,isRefreshComment])

    useEffect(() => {
        if(didMount.current){
            didMount.current=false;
        }
        else{
            setActivityLoading(true);
            fetchActivitiesByHabit(habit.id,activityPage).then(
                (response) => {
                    setActivities((prev) => [...prev,...response.content]);
                    setMaxActivityPage(response.totalPages);
                    setActivityLoading(false);
                },
                (err) => {
                    console.log(err);
                }
            )
        }
    },[activityPage,isActivityRefresh])

    const refreshComments = () => {
        setComments([]);
        setIsRefreshComment(!isRefreshComment);
    }

    const refreshActivities = () => {
        setActivities([]);
        setIsActivityResresh(!isActivityRefresh)
    }

    return ( 
        <Flex flexDir={"column"} minW="sm" maxW="sm" mb="5">
            {
               !loading ? <><Card  mt={"2%"} maxW='sm' size={"md"} background={"gray.400"} border={"1px white solid"}>
               <CardHeader>
                   <Flex spacing='4' alignItems={"center"}>
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
                   >Like </IconButton>
                   <Text>{likesCount}</Text>
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
               <Box>{activityPage < maxActivityPage && <Button onClick={() => setActivityPage((prev) => prev +1)}>Daha Fazla</Button>} </Box> 
               
               {habit.user.id == userId && <ActivityForm habit={habit} refreshActivities={refreshActivities}/>}</>)
               
           }
           {
               !isCommentsHidden && (<>
                    
                    <CommentList habit={habit} commentList={comments} />
                    <Box my="2" >{commentPage < maxCommentPage && <Button onClick={() => setCommentPage((prev) => prev + 1)}>Load More</Button>} </Box>
                    <CommentForm habit={habit} refreshComments={refreshComments}/>
               </>)
               
           }
           
           </Flex></> : <Flex justifyContent={"center"} alignItems={"center"}> <Spinner/></Flex>
            }

        </Flex>

     ); 
}

export default HabitCard;