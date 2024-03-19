import React from 'react'
import {Card,CardBody,Flex,Divider,Text} from "@chakra-ui/react";

function CommentCard({comment}) {
  return (
    <Card size="sm" my={"2"} background={"gray.700"} textColor="whitesmoke" rounded="6" p="2">
        <CardBody>
            <Flex flexDir={"column"} alignItems="top" p="2" >
                <Flex px={"1"} w={"full"}  justifyContent="space-between">
                    <Text fontWeight={"600"}>@{comment.user.username}</Text>
                    <Text fontWeight={"600"}>{comment.createDate.slice(0,10)}</Text>
                </Flex>
                <Divider borderColor="whitesmoke"></Divider>
                <Flex ml={"5"} mt="3">
                    <Text>{comment.commentText}</Text>
                </Flex>
            </Flex>
        </CardBody>
    </Card>
  )
}

export default CommentCard