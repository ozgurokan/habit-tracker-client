import {Flex,Box,Heading,Input,FormControl,Button,Text,Alert} from "@chakra-ui/react"
import {useFormik} from "formik";
import {validationsRegister} from "../validation/validation";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {useEffect} from "react"
import { register } from "../api/authMethods";

function Register() {

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)

    const navigate = useNavigate();
  
    const checkLoggedIn = (a) => {
      if(a){
        navigate("/timeline")
      };
    };
  
    useEffect(() =>{
      checkLoggedIn(isLoggedIn);
    },[])
  

    const formik = useFormik({
        initialValues:{
        name: "",
        surname : "",
        username: "",
        password: "",
        passwordConfirm: "",
        email : "",
        },
        validationSchema :validationsRegister ,
        onSubmit : async(values,bag) => {   
            try{
                const response = await register(values);
                console.log(response)
                navigate("/login")
            }catch(e){
                if(e.response.status == 409){
                   bag.setErrors({general : e.response.data.errors})
                   console.log(e)

                }
                if(e.response.status == 400){
                   bag.setErrors({general : e.response.data.errors})
                }
            }

        }
    })

    const fields = [{
        id: 0,
        title : "Name",
        name: "name",
        idF: "nameField",
        type:"name",
        value : formik.values.name,
        isInvalid : formik.touched.name && formik.errors.name
    },
    {
        id: 1,
        title : "Surname",
        name: "surname",
        idF: "surnameField",
        type:"name",
        value : formik.values.surname,
        isInvalid : formik.touched.surname && formik.errors.surname
    },
    {
        id: 2,
        title : "Username",
        name: "username",
        idF: "usernameField",
        type:"username",
        value : formik.values.username,
        isInvalid : formik.touched.username && formik.errors.username
    },
    {
        id: 3,
        title: "Password",
        name: "password",
        idF: "passwordField",
        value : formik.values.password,
        type:"password",
        isInvalid : formik.touched.password && formik.errors.password
    },
    {
        id: 4,
        title : "Password Confirm",
        name: "passwordConfirm",
        idF: "passwordConfirmField",
        type:"password",
        value : formik.values.passwordConfirm,
        isInvalid : formik.touched.passwordConfirm && formik.errors.passwordConfirm
    },
    {
        id: 5,
        title : "E-mail",
        name: "email",
        idF: "emailField",
        type:"email",
        value : formik.values.email,
        isInvalid : formik.touched.email && formik.errors.email
    }
]

    return (

        <Flex height={"100vh"} flexDir="column" alignItems={"center"} justifyContent="center" background={"gray.900"}>
            <Flex direction={"column"} textColor={"gray.100"} alignItems="center" p="12" background={"gray.700"} rounded="6" justifyContent="center" >
                <Heading >Sign Up</Heading>
                <Text>Please sign up to continue</Text>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl mt={"2rem"} textAlign={"center"} >
                    {fields.map((e) => {
                        return (
                            <div key={e.id}>
                            <Input  variant={"filled"}  mb={"1rem"} placeholder={e.title} id={e.name} type={e.type} name={e.name} onChange={formik.handleChange} onBlur={formik.handleBlur} value={e.value} isInvalid={e.isInvalid}/>
                            </div>
                        )
                    })}
                    </FormControl>
                    <Button width={"full"} my={"1rem"} colorScheme={"teal"} type={"submit"}>Sign Up</Button>
                    <hr />  
                    <Text align={"center"}  fontSize={14} mt={3}> Already have an account? <Link className="link" to="/login">Sign In</Link> </Text>  
                </form>
            </Flex>
            <Box my={4}>
               {formik.errors.general && <Alert justifyContent={"center"} textColor="black" status='error' size={"sm"}>{formik.errors.general} </Alert>}
            </Box>
        </Flex>
    )
    }

export default Register