import React from 'react'
import {Flex,Card,CardBody,Text,Divider} from "@chakra-ui/react";

function ActivityCard({activity}) {
  return (
    <Card size="sm" w="xl" mt={"1"} background={"gray.500"} rounded="md" p="2">
        <CardBody>
            <Flex flexDir={"column"} alignItems="top" p="2" >
                <Flex px={"1"} w={"full"}  justifyContent="space-between">
                    <Text fontWeight={"600"}>@{activity.user.username}</Text>
                    <Text fontWeight={"600"}>{activity.createTime.slice(0,10)}</Text>
                </Flex>
                <Divider borderColor="gray.900"></Divider>
                <Flex ml={"5"} mt="3">
                    <Text>{activity.name}</Text>
                </Flex>
            </Flex>
        </CardBody>
    </Card>
  )
}

export default ActivityCard