import {Flex,Button} from "@chakra-ui/react"
import {Link} from "react-router-dom"

import React from 'react'

function ProfileNavBar({username}) {

  return (
    <Flex padding={"2%"}  justifyContent="space-between">
        <Flex justifyContent={"space-between"}>
            <Link to={"habits"} state={{username : username}}>
              <Button border="1px solid gray"  variant={"ghost"}>
                Habbits
              </Button>
            </Link>
            <Link to={"activities"}><Button border="1px solid gray"  variant={"ghost"} ml={"5"}>Activities</Button></Link>
        </Flex>
        <Flex  justifyContent={"space-between"}>
            <Link to="likes"><Button border="1px solid gray" variant={"ghost"} >Likes</Button></Link>
            <Link to="comments"><Button border="1px solid gray" variant={"ghost"} ml={"5"}>Comments</Button></Link>
        </Flex>
    </Flex>
  )
}

export default ProfileNavBar