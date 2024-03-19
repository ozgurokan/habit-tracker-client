import {useState,useEffect} from 'react';
import {Flex} from "@chakra-ui/react";
import ProfileHeader from '../components/profile/ProfileHeader';
import { useParams,useNavigate } from 'react-router-dom';
import ProfileLayout from '../components/layout/ProfileLayout';
import {useSelector} from "react-redux";
import { fetchUser } from '../api/fetchingUsersMethods';




function Profile() {

    let {username} = useParams(); 

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState({});

    const checkLoggedIn = (a) => {
        if(!a){
            navigate("/login")
        };
    };


    useEffect(() => {
        checkLoggedIn(isLoggedIn);
        setLoading(true);
        fetchUser(username).then(
            (res) => {
            setUser(res);
            setLoading(false);
        }, (err) => {
            console.log(err);
        })
    },[username])




  return (
    <>
    <Flex textColor={"whitesmoke"} flexDir={"column"} padding="2%"  w="50%" minH={"30%"} background="gray.600" mt={"5"} rounded="10">
        <ProfileHeader user={user}/>
        <ProfileLayout username={user.username} userId={user.id}/>
    </Flex>


    </>

  )
}

export default Profile