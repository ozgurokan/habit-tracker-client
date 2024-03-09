
import ActivityCard from './ActivityCard'
import React from 'react'
import {Flex} from "@chakra-ui/react";

function ActivityCardList({activityList}) {
  
    return(
        <Flex  mx={"30%"} my={"2%"} flexDir={"column"}>
            {activityList.map((e) => {
                return  <ActivityCard key={e.id} activity={e} />
            })}
        </Flex>
    )
    
  
}

export default ActivityCardList