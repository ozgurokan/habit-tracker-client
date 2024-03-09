import {
    Card,CardHeader,Flex,Box,Avatar,Text,Heading,IconButton,
    CardBody,CardFooter,Button, Divider

} from "@chakra-ui/react";
import { MdFavoriteBorder, MdPrivateConnectivity } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import {fetchActivitiesByHabit} from "../../api/fetchingActivitiesMethods";
import {useState} from "react";
import ActivityCardList from "../acitivityCard/ActivityCardList";






function HabitCard({habit}) {

    const [activities, setActivities] = useState([]);
    const [loading,setLoading] = useState(false);
    const [isActivitiesHidden,setIsActivitiesHidden] = useState(true);
    const [page,setPage] = useState(0);
    const [maxPage,setMaxPage] = useState(1);

    const fetchActivities = async (habitId,page) => {
        setLoading(true);
        try{
            const response = await fetchActivitiesByHabit(habitId,page);
            setActivities(response.content);
            setMaxPage(response.totalPages);
        }catch(err){
            console.log(err);
        }
    }

    const handleShowingActivities = (bool) => {
        bool ? setIsActivitiesHidden(false) : setIsActivitiesHidden(true)
        
        if(bool){
            fetchActivities(habit.id);

            console.log(activities);
        }
        console.log(isActivitiesHidden)
    }

    const loadMore =() =>{
        setPage(page+1);
    }



    return ( 
        <Flex flexDir={"column"} mb="5">
        <Card  mt={"2%"} maxW='sm' size={"md"} background={"gray.400"} border={"1px white solid"}>
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
                    icon={<MdFavorite fill="white"/>}
                    onClick={() =>{
                        
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
                <Button flex='1' variant='ghost'>
                Comments
                </Button>
                <Button flex='1' variant='ghost' onClick={() => handleShowingActivities(isActivitiesHidden)}>
                Activites
                </Button>
            </CardFooter> 
        </Card>
        <Flex flexDir={"column"} alignItems="center"  justifyContent="center" >
        {
        !isActivitiesHidden && (<> 
        
        <ActivityCardList activityList={activities}/> 
        
        <Box>{page < maxPage && <Button onClick={() => loadMore()}>Daha Fazla</Button>} </Box> </>)
        }
        
        </Flex>


        </Flex>

     ); 
}

export default HabitCard;