import React from 'react'
import {Flex} from "@chakra-ui/react";
import HabitCard from './HabitCard';





function HabitCardList({habitList})  {

  return (
    <>
        {habitList && habitList.map((e) => {
            return ( <HabitCard key={e.id} habit={e} />)
        })}
    </>
  )
}

export default HabitCardList