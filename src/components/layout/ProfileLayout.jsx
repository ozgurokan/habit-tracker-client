import React from 'react'
import {Flex} from "@chakra-ui/react";
import ProfileNavBar from '../profile/ProfileNavBar';
import {Outlet} from "react-router-dom"

function ProfileLayout({username}) {
  return (
    <>
        {/* user info flex */}
        <ProfileNavBar username={username}/>
        <Outlet></Outlet>
    </>
  )
}

export default ProfileLayout