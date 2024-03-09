import { useEffect } from "react"
import {Link,useNavigate} from "react-router-dom"
import {Flex,Box,Heading,FormControl,FormLabel,Text,Input,Button,Alert } from '@chakra-ui/react'
import {useFormik} from "formik"
import {validationsLogin} from "../validation/validation"
import {useDispatch,useSelector} from "react-redux";
import { login } from "../api/authMethods"
import { storeLogin } from "../redux/auth/authSlice"






function LoginPage() {

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

  const navigate = useNavigate();

  const checkLoggedIn = (a) => {
    if(a){
      navigate("/")
    };
  };

  useEffect(() =>{
    checkLoggedIn(isLoggedIn);
  },[])



  const formik = useFormik({
    initialValues:{
      username: "",
      password: ""
    },
    validationSchema : validationsLogin,
    onSubmit : async(values,bag) => {   

        try{
          const response = await login(values)
          dispatch(storeLogin(response))
          navigate("/")
          
        }catch(e){
          
          if(e.response.status == 404){
            bag.setErrors({general : e.response.data.errors})
          }else if(e.response.status==403){
            bag.setErrors({general : "Are you sure about your password?"})
          }
          else{
            bag.setErrors({general : "There is a problem on server! wait and try again :)"})
          }
        }

      }
  }) 

  const fields = [
    {
      id: 0,
      title : "Username",
      name : "username",
      value : formik.values.username,
      isInvalid : formik.touched.username && formik.errors.username
    },
    {
      id: 1,
      title : "Password",
      name : "password",
      value : formik.values.password,
      isInvalid : formik.touched.password && formik.errors.pass
    }
  ]


  return (
    <Flex height={"100vh"} alignItems="center" justifyContent="center" background={"gray.900"}>
      
        <Flex w={"20%"} direction={"column"} textColor={"gray.100"} alignItems="center" p="12" background={"gray.700"} rounded="6" justifyContent="center" >
          <Heading>Sign In</Heading>
          <Text mt={4} textAlign="center">Please sign in to continue</Text>
          <form onSubmit={formik.handleSubmit}>
            <FormControl textAlign={"center"}>
              {fields.map(e =>{
                return (
                  <div key={e.id}>
                    <Input variant={"filled"} placeholder={e.title} mt="1rem" name={e.name} type={e.name} id={e.name} onChange={formik.handleChange} onBlur={formik.handleBlur} value={e.value} isInvalid={e.isInvalid}></Input>
                  </div>
                )
              })}
            
            </FormControl>
            {<Box  my={4}>{formik.errors.general && (<Alert justifyContent={"center"} textColor="black" status='error'>{formik.errors.general}</Alert>)}</Box>}
            <Button width={"full"} my={"1rem"} colorScheme={"teal"} type={"submit"}>Login</Button>
            <hr />
            <Text align={"center"} fontSize={14} mt={3}>  Not have an account yet? <Link className="link" to="/register">Register</Link> </Text>  
          </form>
        </Flex>
    </Flex>
    
  )
}

export default LoginPage