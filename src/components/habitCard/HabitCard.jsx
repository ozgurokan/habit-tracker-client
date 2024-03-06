import {
    Card,CardHeader,Flex,Box,Avatar,Text,Heading,IconButton,
    CardBody,CardFooter,Button

} from "@chakra-ui/react";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";






function HabitCard({habit}) {

    return ( 
        <Card mt={"2%"} maxW='md' size={"md"} background={"gray.400"} border={"1px white solid"}>
            <CardHeader>
                <Flex spacing='4'>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Avatar name={habit.user.name} />
                    <Box>
                    <Heading size='sm'>{habit.user.username}</Heading>
                    <Text></Text>
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
                <Button flex='1' variant='ghost'>
                Activites
                </Button>
            </CardFooter>
        </Card>
     );
}

export default HabitCard;