import React from 'react'
import {Flex,Button,Avatar,Box,Divider} from "@chakra-ui/react"
function ProfileHeader({user}) {
  return (
    <Flex shadow={"0px 0px 5px 0px whitesmoke"} padding={"2%"} rounded="10" alignItems="center" background="gray.500" justifyContent={"space-between"} >
             {/* user avatar-name-username box */}
            <Flex w={"xl"} alignItems={"center"} flexDir="column" size="2xl"  p={"5"} h="full" rounded="10" >
                <Avatar mb={"5"} size={"xl"} name={user.name} />
                <Box mb={"5"}>{user.name}</Box>
                <Box>@{user.username}</Box>
            </Flex>
            <Divider></Divider>
            {/* activity count-register date */}
            <Flex flexDir={"column"} w="full" h="full" alignItems="center" p={"5"} justifyContent={"space-evenly"} border="1px solid gray"  rounded="10">
                <Box textDecoration="underline">Registeration Date</Box>
                <Box fontWeight={"600"}>20-02-2024</Box>
                <Box mt={"10"} textDecoration="underline">Total Activities</Box>
                <Box >312 Activity</Box>
            </Flex>
        </Flex>
  )
}

export default ProfileHeader