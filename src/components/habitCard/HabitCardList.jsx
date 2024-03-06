import React from 'react'
import {Flex} from "@chakra-ui/react";
import HabitCard from './HabitCard';





function HabitCardList({habitList})  {

  return (
    <Flex overflow={"hidden"} mx={"30%"} my={"2%"} flexDir={"column"}>
        {habitList && habitList.map((e) => {
            return ( <HabitCard key={e.id} habit={e} />)
        })}
    </Flex>
  )
}

export default HabitCardList