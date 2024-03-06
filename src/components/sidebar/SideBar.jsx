import React from "react";
import {Flex,
    Box,
    Divider,
    Heading,
    Avatar,
    Text,
    IconButton,
    Button} from "@chakra-ui/react";
import {FiMenu,
    FiHome,
    FiUser,
    FiSettings} from "react-icons/fi"
import { useState } from "react";
import NavItem from "./NavItem";
import { MdOutlineTravelExplore } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import {useDispatch,useSelector} from "react-redux";
import { storeLogOut } from "../../redux/auth/authSlice";
import {Link, useNavigate} from "react-router-dom"


function SideBar() {
    const dispatch = useDispatch();
    const [navSize,setNavSize]  = useState("large");

    const username = useSelector((state) => state.auth.userData.username)

    const navigate = useNavigate();

    const logout = () => {
        dispatch(storeLogOut())
        navigate("/home")
    }
    return (  
        <Flex
            pos={"fixed"}
            h={"100vh"}
            boxShadow="0 0px 6px 0 gray"
            w={navSize == "small" ? "5%" : "12%"}
            flexDir="column"
            justifyContent={"space-between"}
            background="gray.600"
        >
            {/* top section-menu */}
            <Flex p="5%"
                flexDir={"column"}
                alignItems={navSize == "small" ? "center": "flex-start"}
                as={"nav"}
            >
                <IconButton
                    background={"none"}
                    mt={"5"}
                    _hover= {{background : 'none'}}
                    icon={<FiMenu fill="gray.400"/>}
                    onClick={() =>{
                        if(navSize == "small")
                            setNavSize("large")
                        else
                            setNavSize("small")
                    }}
                />
                <Link className="router-link" to={"/"}> <NavItem navSize={navSize} icon={FiHome} title={"Home"}/></Link>
                <Link className="router-link" to={"/explore"}><NavItem navSize={navSize} icon={MdOutlineTravelExplore} title={"Explore"} /></Link>
                <Link className="router-link" to={"/settings"}><NavItem navSize={navSize} icon={FiSettings} title={"Settings"} /></Link>
                <Link className="router-link" to={"/profile"}><NavItem navSize={navSize} icon={FiUser} title={"Profile"} /></Link>
            </Flex>

            {/* bottom section-profile */}
            <Flex
                p={"5%"}
                flexDir={"column"}
                w={"100%"}
                alignItems={"flex-start"}
                mb={4}
            >
                <Divider display={navSize == "small" ? "none": "flex"}/>
                <Flex mt={"1rem"} flexDir={"column"} justifyContent={"center"} alignItems={"center"} width="full">
                    <Avatar my={"1%"} size={"sm"} src={"https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"}/>
                    <Heading display={navSize == "small" ? "none": "flex"} as={"h3"} size={"sm"}>{username}</Heading>
                    <IconButton
                        background={"gray.400"}
                        mt={"5"}
                        size="sm"
                        _hover= {{background : 'none'}}
                        icon={<CiLogout fill="gray.400"/>}
                        onClick={() => {
                           logout()
                        }}
                    >
                    </IconButton>
                </Flex>
                
            </Flex>
        </Flex>

    );
}

export default SideBar;