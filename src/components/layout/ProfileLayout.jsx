import React from 'react'
import {Flex} from "@chakra-ui/react";
import ProfileNavBar from '../profile/ProfileNavBar';
import {Outlet} from "react-router-dom"

function ProfileLayout({username,userId}) {
  return (
    <>
        {/* user info flex */}
        <ProfileNavBar username={username} userId={userId}/>
        <Outlet></Outlet>
    </>
  )
}

export default ProfileLayout