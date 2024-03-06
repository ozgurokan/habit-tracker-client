import React from 'react';
import {Grid,GridItem,Text,Flex} from "@chakra-ui/react"
import UserCard from './UserCard';

function UserCardList({userList}) {
  console.log("allah belanı versin")
  console.log(userList)
  return (
    
    <Grid templateColumns='repeat(2, 1fr)' gap={6}>
        {userList && userList.map((e) => {
            return ( 
              <UserCard key={e.id} user={e} />
            )
        })}
    </Grid>

  )
}

export default UserCardList