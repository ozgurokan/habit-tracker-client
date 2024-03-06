

import { Flex } from '@chakra-ui/react'
import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../sidebar/SideBar'

function Layout() {
  return (
    <Flex background={"gray.700"} width={"full"}>
        <SideBar/>
        <Flex  pb={"2%"} minHeight={"100vh"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>
            <Outlet></Outlet>
        </Flex>
    </Flex>
  )
}

export default Layout