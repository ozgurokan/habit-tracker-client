import React from "react";
import {Flex,Box,Heading,Text} from "@chakra-ui/react"


function Home () {
    return ( 
        
    <Flex height={"100vh"} justifyContent="center" alignItems={"top"} background={"gray.900"} width="full">
        <Flex mt={"5rem"} direction={"column"} textColor={"gray.100"} width="full" textAlign={"center"}>
            <Heading >Welcome to the HabitTracker App!</Heading>
            <Flex justifyContent="center" p={"10rem"}>
            <Flex m={"1rem"} width={"20rem"} p="5rem" alignItems="center" background={"gray.700"}>
                <Box><Text>You can track your habbits!</Text></Box>
            </Flex>
            <Flex m={"1rem"} width={"20rem"} p="5rem" alignItems="center" background={"gray.700"}>
                <Box><Text>Also you can see other people habits!</Text></Box>
            </Flex>
            </Flex>
        </Flex>
    
    </Flex>
     );
}

export default Home;