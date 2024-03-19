import {useEffect,useState} from 'react'
import {Flex,Box,Heading,Button,Text} from "@chakra-ui/react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { storeLogOut } from "../redux/auth/authSlice";



function Logout() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const logout = () => {
        dispatch(storeLogOut());
        navigate("/home");
    }

    const checkLoggedIn = (a) => {
        if(!a){
          navigate("/home")
        }
    };

    
    useEffect(() =>{
        checkLoggedIn(isLoggedIn);
    },[])


    return (
        <Flex flexDir={"column"} width={"full"} height="100vh" overflowY={"hidden"} background="gray.700" justifyContent={"center"} alignItems="center">
            <Flex  p="1% 20%" flexDir={"column"}>
                <Button onClick={()=> logout()}>Sign Out?</Button>
            </Flex>
            
        </Flex>
    )
}

export default Logout