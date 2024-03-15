import {useEffect, useState} from "react";
import {Flex,Button,FormControl,Textarea,Box} from "@chakra-ui/react"
import {useSelector,useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import HabitCardList from "../components/habitCard/HabitCardList";
import {fetchHabitsForTimeline} from "../api/fetchingHabitsMethods";
import { useFormik } from "formik";
import {habitCreationValidation} from "../validation/validation";
import {createNewHabit} from "../api/fetchingHabitsMethods";


function TimeLine() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const navigate = useNavigate();
    const {id} = useSelector((state) => state.auth.userData)

    const [loading,setLoading] = useState(true);
    const [habitlist,setHabitlist] = useState([]);
    const [page,setPage] = useState(0);
    const [maxPageCount,setMaxPageCount] = useState(0);



    const formik = useFormik({
        initialValues:{
            name: "",
        },
        validationSchema : habitCreationValidation,
        onSubmit : async(values,bag) => {   
            try{ 
                const request = {
                    name: values.name,
                    userId : id
                }
                const response = await createNewHabit(request);
                window.location.reload(false);
            }catch(e){  
                bag.setErrors({general : e.response.data.errors})
                console(bag.errors.general)
            }
        }
    }) 


    const checkLoggedIn = (a) => {
        if(!a){
            navigate("/login")
        };
    };


    useEffect(() => {
        checkLoggedIn(isLoggedIn);
        setLoading(true);
        (async function(){
            try{
                const response = await fetchHabitsForTimeline(page);
                setHabitlist(old => [...old,...response.content]);
                setMaxPageCount(response.totalPages);
                setLoading(false);
            }catch(err){
                console.log(err);
            } 
        })()
    },[page])


    const loadMore = () => {
        setPage(page+1)
    }


    return (  
    <Flex pb={"2%"} minHeight={"100vh"} width={"full"} flexDir={"column"} alignItems={"center"} justifyContent={"top"}>
        <Flex alignItems={"center"} background="gray.500" p={5}  m={10} w="30%" border={"1px solid whitesmoke"}>
            <form  onSubmit={formik.handleSubmit} style={{width : "100%"}}>
                <FormControl w={"full"} maxH={"200px"} >
                    <Textarea maxH={"200px"}  type="text" w={"full"} background="#fff" placeholder={"Habit Desc (Min 5 letter)"} mt="1rem" name={"name"} id={"name"} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} isInvalid={formik.touched.name && formik.errors.name}>
                    </Textarea>
                </FormControl>
                {<Box  my={4}>{formik.errors.general && (<Alert justifyContent={"center"} textColor="black" status='error'>{formik.errors.general}</Alert>)}</Box>}
                <Button my={"1rem"} colorScheme={"teal"} type={"submit"}>Publish</Button>
                <hr /> 
            </form>
        </Flex>
        
        <HabitCardList habitList={habitlist} />
        {
            loading && <div>Loading...</div>
        }
        <div>{page < maxPageCount ? <Button onClick={() => loadMore()}>Daha Fazla</Button> : <Button>Bitti</Button>}</div>    
            
    </Flex>


    );
}

export default TimeLine;