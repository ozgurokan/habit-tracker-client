import {
    Card,CardHeader,Flex,Box,Avatar,Text,Heading,IconButton,
    CardBody,CardFooter,Button

} from "@chakra-ui/react";


import React from 'react'

function UserCard({user}) {
  return (

    <Card mt={"5%"} w="sm" size={"lg"} background={"gray.400"} border={"1px white solid"}>
        <CardHeader size="lg" w={"full"} h="full">
            <Flex flexDir={"column"} pt="10%"  alignItems='center' justifyContent={"center"} >
                <Avatar size={"lg"} name={user.name} />
                <Box>
                <Heading mt={"10%"} size='md'>{user.name}</Heading>
                <Text mt={"5%"} textAlign={"center"}>@{user.username}</Text>
            </Box>
            </Flex>
            
        </CardHeader>
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
                Profile
            </Button>
        </CardFooter>
    </Card>
  )
}

export default UserCard