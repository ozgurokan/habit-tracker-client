import React from 'react'
import {Flex} from "@chakra-ui/react";
import CommentCard from './CommentCard';



function CommentList({commentList}) {



return (
<Flex flexDir={"column"} justifyContent={"center"} width="full" background={"gray.500"} rounded="5" p="5%" mt={2}>
    <Flex mb={"1%"} flexDir="column" >
            {commentList && commentList.map((e) => {
                return  <CommentCard key={e.id} comment={e} />
            })}
    </Flex>

</Flex>
  )
}

export default CommentList